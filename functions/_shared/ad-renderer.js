/**
 * Advertisement HTML Renderer
 *
 * Converts AdVariant JSON data into styled HTML matching the current design
 */

/**
 * Render rich text content
 * @param {string|object} content - Plain string or RichText object
 * @returns {string} HTML string
 */
function renderRichText(content) {
  if (typeof content === 'string') {
    return escapeHtml(content);
  }

  if (content && typeof content === 'object' && content.text) {
    if (content.html) {
      // Content already contains HTML, use as-is
      return content.text;
    }
    return escapeHtml(content.text);
  }

  return '';
}

/**
 * Escape HTML to prevent XSS (for plain text)
 */
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Render a single feature
 * @param {string|object} feature - Feature data
 * @returns {string} HTML for feature badge
 */
function renderFeature(feature) {
  // Handle simple string features
  if (typeof feature === 'string') {
    return `
      <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md
        bg-orange-50/85 dark:bg-blue-500/10
        text-orange-700 dark:text-blue-300
        border border-orange-100/70 dark:border-blue-500/20
        font-medium">
        ${escapeHtml(feature)}
      </div>
    `;
  }

  // Handle feature object with configuration
  if (feature && typeof feature === 'object') {
    if (feature.enabled === false) {
      return ''; // Feature is disabled
    }

    const content = renderRichText(feature.content);
    const customClass = feature.className || '';

    if (feature.highlight) {
      return `
        <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md
          bg-orange-50/85 dark:bg-blue-500/10
          text-orange-700 dark:text-blue-300
          border border-orange-100/70 dark:border-blue-500/20
          font-medium ${customClass}">
          ${content}
        </div>
      `;
    }

    // Non-highlighted feature (plain text)
    return `<span class="${customClass}">${content}</span>`;
  }

  return '';
}

/**
 * Render advertisement HTML (Primary Style)
 *
 * Uses onclick technique to handle nested links:
 * - Main card area uses onclick for sponsor link
 * - Inner links in description use onclick and stopPropagation
 *
 * @param {object} adData - AdVariant data object
 * @param {string} lang - Language code (zh/en)
 * @returns {string} Complete HTML for the advertisement
 */
export function renderAdPrimary(adData, lang = 'zh') {
  const {
    title,
    description,
    cta = lang === 'zh' ? '了解更多' : 'Learn More',
    link,
    logo,
    logoDark,
    features = [],
    badge = 'SPONSOR',
    showSponsorLink = true,
    sponsorLinkText,
    customStyles = {},
  } = adData;

  const titleHtml = renderRichText(title);
  const descriptionHtml = renderRichText(description);
  const featuresHtml = features
    .map((f) => renderFeature(f))
    .filter(Boolean)
    .join('\n');
  const hasSponsorFeatures = features.length > 0;
  const isAnchorLink = typeof link === 'string' && link.startsWith('#');
  const targetAttr = isAnchorLink ? '' : ' target="_blank"';
  const relAttr = isAnchorLink ? '' : ' rel="sponsored"';
  const anchorAttributes = `${targetAttr}${relAttr}`;

  // Sponsor link text with fallback
  const finalSponsorLinkText = sponsorLinkText || (lang === 'zh' ? '成为赞助商' : 'Become a sponsor');
  const sponsorLinkHref = lang === 'zh' ? '/en/sponsorship/' : '/en/sponsorship/';

  // Logo HTML with dark mode support
  const logoHtml = logoDark
    ? `
    <!-- Light mode logo -->
    <img
      src="${logo}"
      alt="Sponsor Logo"
      class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl shadow-sm bg-gray-50 object-cover dark:hidden"
      loading="lazy"
    />
    <!-- Dark mode logo -->
    <img
      src="${logoDark}"
      alt="Sponsor Logo"
      class="hidden dark:block w-12 h-12 sm:w-16 sm:h-16 rounded-xl shadow-sm bg-transparent object-cover"
      loading="lazy"
    />
  `
    : `
    <img
      src="${logo}"
      alt="Sponsor Logo"
      class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl shadow-sm bg-gray-50 dark:bg-transparent object-cover"
      loading="lazy"
    />
  `;

  return `
<div class="relative mt-12 mb-2 not-prose font-sans ${customStyles.containerClass || ''}">
  <!-- 核心广告卡片 - 点击整个卡片跳转到赞助商链接 -->
  <div class="group
    relative overflow-hidden rounded-xl
    border border-gray-200/80 dark:border-gray-700/70
    bg-white/95 dark:bg-slate-900/40
    p-4 sm:p-5
    shadow-sm
    transition-colors duration-200
    cursor-pointer"
    onclick="window.open('${link}', '${isAnchorLink ? '_self' : '_blank'}')">

    <div class="flex items-start gap-4">
      <!-- Logo -->
      <div class="shrink-0">
        ${logoHtml}
      </div>

      <!-- 内容区域 -->
      <div class="flex-1 min-w-0 pt-0.5">
        <!-- 顶部行：标题 + 标签 -->
        <div class="flex items-start justify-between gap-3 mb-1.5">
          <h4 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 leading-snug ${
            customStyles.titleClass || ''
          }">
            ${titleHtml}
          </h4>

          <!-- Sponsor 标签 -->
          <span class="shrink-0 text-[10px] font-semibold tracking-wide uppercase
            text-gray-400 dark:text-gray-500
            border border-gray-200/60 dark:border-gray-700/60
            bg-white/60 dark:bg-slate-900/50
            rounded px-1.5 py-0.5 select-none">
            ${escapeHtml(badge)}
          </span>
        </div>

        <!-- 描述文字 -->
        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed sm:line-clamp-none ${
          customStyles.descriptionClass || ''
        }">
          ${descriptionHtml}
        </p>

        <!-- 底部行：Features + CTA -->
          ${
            hasSponsorFeatures
              ? `
          <div class="mt-3 flex flex-wrap items-center gap-3 text-xs sm:text-sm ${customStyles.ctaClass || ''}">
            <!-- Features -->
            ${featuresHtml}

            <!-- 引导文字 -->
            <div class="ml-auto flex items-center gap-1
              text-gray-500 dark:text-gray-500
              transition-all duration-200 font-medium
              group-hover:text-secondary dark:group-hover:text-secondary">
              ${escapeHtml(cta)}
              <svg class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </div>
          </div>
          `
              : `
          <!-- No features, show only CTA -->
          <div class="mt-3 flex items-center gap-1 text-xs sm:text-sm
            text-gray-500 dark:text-gray-500
            transition-all duration-200 font-medium
            group-hover:text-secondary dark:group-hover:text-secondary ${customStyles.ctaClass || ''}">
            ${escapeHtml(cta)}
            <svg class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </div>
          `
          }
        </div>
      </div>
    </div>

  ${
    showSponsorLink
      ? `
  <!-- 外部链接：招商 -->
  <div class="flex justify-end mt-2 mr-1">
    <a href="${sponsorLinkHref}" target="_blank"
      class="group/link flex items-center gap-1
      text-[11px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
      transition-colors not-prose"
      onclick="event.stopPropagation()">
      ${escapeHtml(finalSponsorLinkText)}
      <svg class="w-3 h-3 opacity-0 -ml-1 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all"
        fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
      </svg>
    </a>
  </div>
  `
      : ''
  }
</div>
  `.trim();
}

/**
 * Render advertisement HTML (Secondary Style - Article Inline)
 * Designed to blend seamlessly with article content
 * @param {object} adData - AdVariant data object
 * @param {string} lang - Language code (zh/en)
 * @returns {string} Complete HTML for the advertisement
 */
export function renderAdSecondary(adData, lang = 'zh') {
  const { title, description, cta, link, logo, logoDark, badge = lang === 'zh' ? '本期赞助' : 'SPONSOR' } = adData;

  const titleHtml = renderRichText(title);
  const descriptionHtml = renderRichText(description);
  const ctaHtml = cta ? renderRichText(cta) : '';
  const isAnchorLink = typeof link === 'string' && link.startsWith('#');

  // Chinese language tracking
  const trackingClass = lang === 'zh' ? 'tracking-wide' : '';

  // Logo HTML with optional dark mode support
  const logoHtml = logo
    ? logoDark
      ? `
      <img src="${logo}" alt="icon" class="inline-block w-4 h-4 rounded-sm mr-1.5 -mt-0.5 opacity-80 align-middle dark:hidden">
      <img src="${logoDark}" alt="icon" class="inline-block w-4 h-4 rounded-sm mr-1.5 -mt-0.5 opacity-80 align-middle hidden dark:inline-block">
    `
      : `
      <img src="${logo}" alt="icon" class="inline-block w-4 h-4 rounded-sm mr-1.5 -mt-0.5 opacity-80 align-middle">
    `
    : '';

  return `
<!-- 顶部原生文字广告容器 -->
<div class="relative not-prose font-sans">
  <!-- 核心布局：左侧边框 + 文字内容 -->
  <div class="
    group relative pl-4 py-1
    border-l-4 border-secondary
    cursor-pointer
  "
    onclick="window.open('${link}', '${isAnchorLink ? '_self' : '_blank'}')">

    <!-- 第一行：Sponsor 标识 + 标题 -->
    <div class="flex items-baseline gap-2 mb-2 flex-wrap ${trackingClass}">
      <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 select-none">
        ${escapeHtml(badge)}
      </span>
      <div class="text-base font-bold text-heading">
        ${titleHtml}
      </div>
    </div>

    <!-- 正文内容：像博主的一句话推荐 -->
    <p class="text-base leading-relaxed text-body ${trackingClass}">
      ${logoHtml}${descriptionHtml}${
        ctaHtml
          ? `
      <span class="ml-1 font-medium text-secondary group-hover:underline decoration-text-secondary underline-offset-2">
        ${ctaHtml}
      </span>`
          : ''
      }
    </p>

  </div>
</div>
  `.trim();
}

/**
 * Render a single feature as a plain <li> for the new design (html.fb).
 * Disabled features and empty content are skipped.
 * @param {string|object} feature - Feature data
 * @returns {string} <li> HTML or empty string
 */
function renderFeatureFb(feature) {
  let content = '';
  if (typeof feature === 'string') {
    content = escapeHtml(feature);
  } else if (feature && typeof feature === 'object') {
    if (feature.enabled === false) return '';
    content = renderRichText(feature.content);
  }
  return content ? `<li>${content}</li>` : '';
}

/**
 * Render advertisement HTML for the new design (html.fb).
 * Used for both style 1 (card) and style 2 (inline); styles live in site.css (`html.fb .sponsor*`).
 * Links are real anchors so the client's delegated click tracking and UTM injection keep working.
 * @param {object} adData - AdVariant data object. Optional `label` replaces the top "Sponsor" tag — only for
 *   house ads (e.g. the newsletter default ad), which should also set `showSponsorLink: false`.
 * @param {string} lang - Language code (zh/en)
 * @returns {string} Complete HTML for the advertisement
 */
export function renderAdFb(adData, lang = 'zh') {
  const {
    title,
    description,
    cta,
    link,
    logo,
    logoDark,
    features,
    showSponsorLink = true,
    sponsorLinkText,
    label,
  } = adData;
  const isZh = lang === 'zh';
  const tagText = label ? String(label) : isZh ? '赞助 · Sponsor' : 'Sponsor';
  const groupLabel = label ? String(label) : isZh ? '赞助内容' : 'Sponsored';

  const titleHtml = renderRichText(title);
  const descriptionHtml = renderRichText(description);
  const ctaText = cta ? renderRichText(cta) : isZh ? '了解更多' : 'Learn More';

  const isAnchorLink = typeof link === 'string' && link.startsWith('#');
  const targetAttrs = isAnchorLink ? '' : ' target="_blank" rel="sponsored noopener"';
  const hrefAttr = escapeHtml(typeof link === 'string' ? link : '');

  // Logo: image if provided, otherwise the first letter of the (tag-stripped) title
  let logoInner;
  const logoImg = (src, cls) =>
    `<img class="${cls}" src="${escapeHtml(String(src))}" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">`;
  if (logo) {
    // 提供 logoDark 时同时输出两张，由 site.css 按 html.dark 切换
    logoInner = logoImg(logo, 'logo-light') + (logoDark ? logoImg(logoDark, 'logo-dark') : '');
  } else {
    const plainTitle = (typeof title === 'string' ? title : (title && title.text) || '').replace(/<[^>]*>/g, '').trim();
    logoInner = escapeHtml(Array.from(plainTitle)[0] || 'S');
  }

  const featItems = (Array.isArray(features) ? features : []).map(renderFeatureFb).filter(Boolean);
  const featsHtml = featItems.length ? `\n      <ul class="sponsor-feats">${featItems.join('')}</ul>` : '';

  const becomeText = sponsorLinkText || (isZh ? '成为赞助商' : 'Become a sponsor');
  const becomeHtml =
    showSponsorLink !== false
      ? `\n    <a class="sponsor-become" href="/en/sponsorship/">${escapeHtml(becomeText)} →</a>`
      : '';

  return `
<div class="sponsor" role="group" aria-label="${escapeHtml(groupLabel)}">
  <div class="sponsor-top">
    <span class="sponsor-tag label">${escapeHtml(tagText)}</span>${becomeHtml}
  </div>
  <div class="sponsor-body">
    <div class="sponsor-logo" aria-hidden="true">${logoInner}</div>
    <div>
      <p class="sponsor-title">${titleHtml}</p>
      <p class="sponsor-desc">${descriptionHtml}</p>${featsHtml}
      <a class="sponsor-cta" href="${hrefAttr}"${targetAttrs}>${ctaText} →</a>
    </div>
  </div>
</div>
  `.trim();
}

/**
 * Render advertisement by style
 * @param {object} adData - AdVariant data object
 * @param {string} lang - Language code (zh/en)
 * @param {number} style - Style type (1=primary, 2=secondary)
 * @param {string} [design] - Design variant; 'fb' selects the new-design markup for both styles
 * @returns {string} Complete HTML for the advertisement
 */
export function renderAdByStyle(adData, lang = 'zh', style = 1, design = '') {
  if (design === 'fb') {
    return renderAdFb(adData, lang);
  }
  if (style === 2) {
    return renderAdSecondary(adData, lang);
  }
  return renderAdPrimary(adData, lang);
}

/**
 * Backward compatibility: default export uses primary style
 */
export function renderAd(adData, lang = 'zh') {
  return renderAdPrimary(adData, lang);
}
