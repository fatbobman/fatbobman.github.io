/**
 * Dynamic Advertisement Endpoint - English
 *
 * Fetches ads from KV storage and returns based on schedule and version
 * Query parameters:
 *   - version: 1 or 2 (default: 1)
 *   - sponsorId: specific sponsor ID to display
 */

import { getKV } from '../_shared/mock-kv.js';

const ADS_KEY = 'ads-schedule';

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Get query parameters
  const requestedVersion = parseInt(url.searchParams.get('version') || '1');
  const requestedSponsorId = url.searchParams.get('sponsorId');

  // CORS headers
  const allowedOrigins = [
    'http://localhost:4321',
    'https://fatbobman.com',
    'https://fatbobman.github.io',
    'blogsource-8wyy6rcw.edgeone.site'
  ];

  const origin = request.headers.get('Origin');
  const headers = new Headers({
    'content-type': 'text/html; charset=UTF-8',
  });

  if (allowedOrigins.includes(origin)) {
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Vary', 'Origin');
  }

  try {
    // Get KV instance
    const kv = await getKV(env, false);

    // Read ads data from KV
    const rawData = await kv.get(ADS_KEY, { type: 'text' });

    if (!rawData) {
      return fallbackResponse(headers);
    }

    const adsData = JSON.parse(rawData);
    const now = new Date();

    // Find active schedule
    let activeSchedule = null;

    if (requestedSponsorId) {
      // If specific sponsor requested, find it regardless of date
      activeSchedule = adsData.schedules.find(s =>
        s.sponsorId === requestedSponsorId && s.enabled
      );
    } else {
      // Find schedule that is active now
      activeSchedule = adsData.schedules.find(s => {
        if (!s.enabled) return false;
        const startDate = new Date(s.startDate);
        const endDate = new Date(s.endDate);
        return now >= startDate && now <= endDate;
      });
    }

    // If no active schedule, use default ad
    if (!activeSchedule) {
      const defaultAd = adsData.default?.en;
      if (!defaultAd) {
        return fallbackResponse(headers);
      }

      const html = generateAdHTML(defaultAd, false);
      headers.append('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
      return new Response(html, { headers });
    }

    // Get the requested version from active schedule
    const enVariants = activeSchedule.variants?.en || [];
    let selectedVariant = enVariants.find(v => v.version === requestedVersion);

    // Fallback to version 1 if requested version not found
    if (!selectedVariant && requestedVersion !== 1) {
      selectedVariant = enVariants.find(v => v.version === 1);
    }

    // If still no variant, use default
    if (!selectedVariant) {
      const defaultAd = adsData.default?.en;
      if (!defaultAd) {
        return fallbackResponse(headers);
      }

      const html = generateAdHTML(defaultAd, false);
      headers.append('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
      return new Response(html, { headers });
    }

    // Generate HTML for the selected variant
    const html = generateAdHTML(selectedVariant, true);

    // Cache for 30 seconds for sponsored ads
    headers.append('Cache-Control', 'public, max-age=30, stale-while-revalidate=3600');

    // Generate ETag
    const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(html));
    const etag = `"${btoa(String.fromCharCode(...new Uint8Array(hash)))}"`;

    if (request.headers.get('If-None-Match') === etag) {
      return new Response(null, { status: 304, headers });
    }

    headers.append('ETag', etag);

    return new Response(html, { headers });

  } catch (error) {
    console.error('Error fetching ad:', error);
    return fallbackResponse(headers);
  }
}

/**
 * Generate HTML for an ad variant
 */
function generateAdHTML(ad, isSponsored) {
  const hasFeatures = ad.features && Array.isArray(ad.features) && ad.features.length > 0;

  const featuresHTML = hasFeatures
    ? ad.features.map(feature => `
        <div class="
          inline-flex items-center gap-2 px-2.5 py-1 rounded-md
          bg-orange-50/85 dark:bg-blue-500/10
          text-orange-700 dark:text-blue-300
          border border-orange-100/70 dark:border-blue-500/20
          font-medium text-xs sm:text-sm
        ">
          ${feature}
        </div>
      `).join('\n')
    : '';

  return `
<div class="relative my-12 not-prose font-sans">
  <a href="${ad.link}" target="_blank" rel="${isSponsored ? 'sponsored' : 'nofollow'}" class="block not-prose">
    <div class="group
      relative overflow-hidden rounded-xl
      border border-gray-200/80 dark:border-gray-700/70
      bg-white/95 dark:bg-slate-900/40
      p-4 sm:p-5
      shadow-sm
      transition-colors duration-200
    ">

      <div class="flex items-start gap-4">

        <!-- Logo -->
        <div class="shrink-0">
          <img
            src="${ad.logo}"
            alt="${ad.title}"
            class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl shadow-sm bg-gray-50 dark:bg-transparent object-cover"
            loading="lazy"
          />
        </div>

        <!-- Content -->
        <div class="flex-1 min-w-0 pt-0.5">

          <div class="flex items-start justify-between gap-3 mb-1.5">
            <h4 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 leading-snug">
              ${ad.title}
            </h4>

            <span class="
              shrink-0 text-[10px] font-semibold tracking-wide uppercase
              text-gray-400 dark:text-gray-500
              border border-gray-200/60 dark:border-gray-700/60
              bg-white/60 dark:bg-slate-900/50
              rounded px-1.5 py-0.5 select-none
            ">
              ${ad.badge}
            </span>
          </div>

          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed sm:line-clamp-none">
            ${ad.description}
          </p>

          ${hasFeatures ? `
          <div class="mt-3 flex flex-wrap items-center gap-3">
            ${featuresHTML}

            <!-- CTA -->
            <div class="
              ml-auto flex items-center gap-1
              text-gray-500 dark:text-gray-500
              transition-all duration-200 font-medium text-xs sm:text-sm
              group-hover:text-secondary dark:group-hover:text-secondary
            ">
              ${ad.cta}
              <svg
                class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
          ` : `
          <div class="mt-3 flex items-center">
            <div class="
              ml-auto flex items-center gap-1
              text-gray-500 dark:text-gray-500
              transition-all duration-200 font-medium text-xs sm:text-sm
              group-hover:text-secondary dark:group-hover:text-secondary
            ">
              ${ad.cta}
              <svg
                class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
          `}

        </div>
      </div>
    </div>
  </a>

  ${isSponsored ? `
  <!-- Sponsor link -->
  <div class="flex justify-end mt-2 mr-1">
    <a href="/en/sponsorship/" target="_blank" class="
      group/link flex items-center gap-1
      text-[11px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
      transition-colors not-prose
    ">
      Become a sponsor
      <svg class="w-3 h-3 opacity-0 -ml-1 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  </div>
  ` : ''}

</div>
  `.trim();
}

/**
 * Fallback response when no ad data available
 */
function fallbackResponse(headers) {
  const html = `
<div class="relative my-12 not-prose font-sans">
  <div class="text-center py-8 text-gray-500 dark:text-gray-400">
    <p class="text-sm">Ad space available</p>
  </div>
</div>
  `.trim();

  headers.append('Cache-Control', 'public, max-age=60, stale-while-revalidate=120');
  return new Response(html, { headers });
}
