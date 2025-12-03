/**
 * Unified Dynamic Advertisement Endpoint
 *
 * Fetches ads from KV storage and returns based on schedule and version
 * The style is determined by the variant data itself, not by request parameter
 *
 * Query parameters:
 *   - lang: zh | en (required)
 *   - version: 1 or 2 (optional, default: 1)
 *   - sponsorId: specific sponsor ID to display (optional, for testing)
 *   - scheduleId: specific schedule UUID (optional, for testing)
 */

import { getKV } from '../_shared/mock-kv.js';
import { renderAdByStyle } from '../_shared/ad-renderer.js';

const ADS_KEY = 'ads-schedule';

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  // Get query parameters
  const lang = url.searchParams.get('lang') || 'zh';
  const requestedVersion = parseInt(url.searchParams.get('version') || '1');
  const requestedSponsorId = url.searchParams.get('sponsorId');
  const requestedScheduleId = url.searchParams.get('scheduleId');

  // Validate lang parameter
  if (!['zh', 'en'].includes(lang)) {
    return new Response(JSON.stringify({ error: 'Invalid lang parameter. Must be zh or en.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // CORS headers
  const allowedOrigins = [
    'http://localhost:4321',
    'http://localhost:8788',
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
      return fallbackResponse(headers, lang);
    }

    const adsData = JSON.parse(rawData);

    // Get current UTC time for date comparison
    const now = new Date();

    // Find active schedule
    let activeSchedule = null;

    if (requestedScheduleId) {
      // Test mode: find specific schedule by ID (ignore date)
      activeSchedule = adsData.schedules.find(s => s.id === requestedScheduleId);
    } else if (requestedSponsorId) {
      // Test mode: find specific sponsor (ignore date)
      activeSchedule = adsData.schedules.find(s =>
        s.sponsorId === requestedSponsorId && s.enabled
      );
    } else {
      // Production mode: find schedule active now (UTC time)
      activeSchedule = adsData.schedules.find(s => {
        if (!s.enabled) return false;

        // Parse dates as UTC (full day coverage)
        // startDate: "2025-12-01" -> UTC 2025-12-01 00:00:00
        // endDate: "2025-12-07" -> UTC 2025-12-07 23:59:59
        const startDate = new Date(s.startDate + 'T00:00:00Z');
        const endDate = new Date(s.endDate + 'T23:59:59Z');

        return now >= startDate && now <= endDate;
      });
    }

    // If no active schedule, use default ad
    if (!activeSchedule) {
      const defaultAd = adsData.default?.[lang];
      if (!defaultAd) {
        return fallbackResponse(headers, lang);
      }

      // Default ad always uses primary style (style=1)
      const html = renderAdByStyle(defaultAd, lang, 1);
      headers.append('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
      return new Response(html, { headers });
    }

    // Get variants for the requested language
    const variants = activeSchedule.variants?.[lang] || [];

    // Find variant with fallback logic (only by version)
    let selectedVariant = findVariantWithFallback(variants, requestedVersion);

    // If still no variant, use default ad
    if (!selectedVariant) {
      const defaultAd = adsData.default?.[lang];
      if (!defaultAd) {
        return fallbackResponse(headers, lang);
      }

      const html = renderAdByStyle(defaultAd, lang, 1);
      headers.append('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
      return new Response(html, { headers });
    }

    // Generate HTML for the selected variant
    const html = renderAdByStyle(selectedVariant, lang, selectedVariant.style || 1);

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
    return fallbackResponse(headers, lang);
  }
}

/**
 * Find variant with fallback logic
 * Priority:
 * 1. Requested version (with its defined style)
 * 2. Version 1 (with its defined style)
 * 3. First available variant
 */
function findVariantWithFallback(variants, requestedVersion) {
  if (variants.length === 0) return null;

  // Priority 1: Find requested version
  let variant = variants.find(v => v.version === requestedVersion);
  if (variant) return variant;

  // Priority 2: Fallback to version 1
  if (requestedVersion !== 1) {
    variant = variants.find(v => v.version === 1);
    if (variant) return variant;
  }

  // Priority 3: Return first available variant
  return variants[0];
}

/**
 * Fallback response when no ad data available
 */
function fallbackResponse(headers, lang) {
  const text = lang === 'zh' ? '广告位招租' : 'Ad space available';
  const html = `
<div class="relative my-12 not-prose font-sans">
  <div class="text-center py-8 text-gray-500 dark:text-gray-400">
    <p class="text-sm">${text}</p>
  </div>
</div>
  `.trim();

  headers.append('Cache-Control', 'public, max-age=60, stale-while-revalidate=120');
  return new Response(html, { headers });
}
