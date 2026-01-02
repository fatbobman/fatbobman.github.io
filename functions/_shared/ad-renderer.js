/**
 * Advertisement HTML Renderer
 */

function renderRichText(content) {
  if (typeof content === 'string') return escapeHtml(content);
  if (content && typeof content === 'object' && content.text) {
    return content.html ? content.text : escapeHtml(content.text);
  }
  return '';
}

function escapeHtml(text) {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function renderFeature(feature) {
  if (typeof feature === 'string') {
    return `<div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-orange-50/85 dark:bg-blue-500/10 text-orange-700 dark:text-blue-300 border border-orange-100/70 dark:border-blue-500/20 font-medium">${escapeHtml(feature)}</div>`;
  }
  if (feature && typeof feature === 'object' && feature.enabled !== false) {
    const content = renderRichText(feature.content);
    const customClass = feature.className || '';
    if (feature.highlight) {
      return `<div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-orange-50/85 dark:bg-blue-500/10 text-orange-700 dark:text-blue-300 border border-orange-100/70 dark:border-blue-500/20 font-medium ${customClass}">${content}</div>`;
    }
    return `<span class="${customClass}">${content}</span>`;
  }
  return '';
}

/**
 * 样式 1：底部卡片广告
 */
export function renderAdPrimary(adData, lang = 'zh') {
  const { title, description, cta = lang === 'zh' ? '了解更多' : 'Learn More', link, logo, logoDark, features = [], badge = 'SPONSOR', showSponsorLink = true, sponsorLinkText, customStyles = {} } = adData;

  const titleHtml = renderRichText(title);
  const descriptionHtml = renderRichText(description);
  const featuresHtml = features.map(f => renderFeature(f)).filter(Boolean).join('\n');
  
  const isAnchorLink = typeof link === 'string' && link.startsWith('#');
  const targetAttr = isAnchorLink ? '' : ' target="_blank"';
  const relAttr = isAnchorLink ? '' : ' rel="sponsored"';
  const anchorAttributes = `${targetAttr}${relAttr}`;

  const finalSponsorLinkText = sponsorLinkText || (lang === 'zh' ? '成为赞助商' : 'Become a sponsor');
  const sponsorLinkHref = lang === 'zh' ? '/zh/sponsorship/' : '/en/sponsorship/';

  const logoHtml = logoDark
    ? `<img src="${logo}" class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl shadow-sm bg-gray-50 object-cover dark:hidden" loading="lazy" />
       <img src="${logoDark}" class="hidden dark:block w-12 h-12 sm:w-16 sm:h-16 rounded-xl shadow-sm bg-transparent object-cover" loading="lazy" />`
    : `<img src="${logo}" class="w-12 h-12 sm:w-16 sm:h-16 rounded-xl shadow-sm bg-gray-50 dark:bg-transparent object-cover" loading="lazy" />`;

  return `
<div class="relative mt-12 mb-2 not-prose font-sans ${customStyles.containerClass || ''}">
  <!-- 背景链接：撑满全场，层级 z-0 -->
  <a href="${link}"${anchorAttributes} class="absolute inset-0 z-0 rounded-xl"></a>

  <!-- 内容层：层级 z-10，设置穿透 -->
  <div class="relative z-10 pointer-events-none group overflow-hidden rounded-xl border border-gray-200/80 dark:border-gray-700/70 bg-white/95 dark:bg-slate-900/40 p-4 sm:p-5 shadow-sm transition-colors duration-200">
    <div class="flex items-start gap-4">
      <div class="shrink-0">${logoHtml}</div>
      <div class="flex-1 min-w-0 pt-0.5">
        <div class="flex items-start justify-between gap-3 mb-1.5">
          <h4 class="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 leading-snug">${titleHtml}</h4>
          <span class="shrink-0 text-[10px] font-semibold tracking-wide uppercase text-gray-400 dark:text-gray-500 border border-gray-200/60 dark:border-gray-700/60 bg-white/60 dark:bg-slate-900/50 rounded px-1.5 py-0.5 select-none">${escapeHtml(badge)}</span>
        </div>
        <!-- 描述文字：通过内部链接恢复点击 -->
        <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          ${descriptionHtml}
        </p>
        <div class="mt-3 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
          ${featuresHtml}
          <div class="ml-auto flex items-center gap-1 text-gray-500 transition-all duration-200 font-medium group-hover:text-secondary">
            ${escapeHtml(cta)}
            <svg class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
  ${showSponsorLink ? `
  <div class="flex justify-end mt-2 mr-1 relative z-20">
    <a href="${sponsorLinkHref}" target="_blank" class="group/link flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
      ${escapeHtml(finalSponsorLinkText)}
      <svg class="w-3 h-3 opacity-0 -ml-1 group-hover/link:opacity-100 group-hover/link:ml-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
      </svg>
    </a>
  </div>` : ''}
</div>`.trim();
}

/**
 * 样式 2：开头内联广告
 */
export function renderAdSecondary(adData, lang = 'zh') {
  const { title, description, cta, link, logo, logoDark, badge = lang === 'zh' ? '本期赞助' : 'SPONSOR' } = adData;

  const titleHtml = renderRichText(title);
  const descriptionHtml = renderRichText(description);
  const ctaHtml = cta ? renderRichText(cta) : '';
  const isAnchorLink = typeof link === 'string' && link.startsWith('#');
  const targetAttr = isAnchorLink ? '' : ' target="_blank"';
  const relAttr = isAnchorLink ? '' : ' rel="sponsored"';
  const anchorAttributes = `${targetAttr}${relAttr}`;

  const logoHtml = logo
    ? `<img src="${logo}" class="inline-block w-4 h-4 rounded-sm mr-1.5 -mt-0.5 opacity-80 align-middle dark:hidden">
       <img src="${logoDark}" class="inline-block w-4 h-4 rounded-sm mr-1.5 -mt-0.5 opacity-80 align-middle hidden dark:inline-block">`
    : '';

  return `
<div class="relative not-prose font-sans group">
  <!-- 背景链接 -->
  <a href="${link}"${anchorAttributes} class="absolute inset-0 z-0"></a>

  <!-- 内容层 -->
  <div class="relative pl-4 py-1 border-l-4 border-secondary z-10 pointer-events-none">
    <div class="flex items-baseline gap-2 mb-2 flex-wrap tracking-wide">
      <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 select-none">${escapeHtml(badge)}</span>
      <div class="text-base font-bold text-heading">${titleHtml}</div>
    </div>
    <p class="text-base leading-relaxed text-body tracking-wide">
      ${logoHtml}${descriptionHtml}${ctaHtml ? `<span class="ml-1 font-medium text-secondary group-hover:underline underline-offset-2">${ctaHtml}</span>` : ''}
    </p>
  </div>
</div>`.trim();
}

export function renderAdByStyle(adData, lang = 'zh', style = 1) {
  return style === 2 ? renderAdSecondary(adData, lang) : renderAdPrimary(adData, lang);
}