import { e as createAstro, c as createComponent, r as renderTemplate, d as defineScriptVars, f as addAttribute, m as maybeRenderHead, b as renderScript, a as renderComponent } from './astro/server_C0quZjbu.mjs';
import 'kleur/colors';
import { b as PostVisibility, u as urlHelper, L as Lang, U as URLType } from './images_Ck81mHQe.mjs';
import { $ as $$PageLayout } from './PageLayout_C5hChsBd.mjs';
import 'clsx';
import { d as dataOperator, m as metaDataHelper } from './metaData_Cr-Y257r.mjs';
import { d as dataFormat } from './languages_C_U14EfB.mjs';
import { $ as $$Footer, a as $$Header } from './Footer_B4u8gcKS.mjs';
import { w as weeklyHelper } from './weekly_DbXVvKYs.mjs';
import { $ as $$AdsNewLoader } from './AdsNewLoader_CevgxE9A.mjs';
import { s as snippetOperator } from './snippets_C28dQPqY.mjs';
import { j as jsonLdHelper } from './BaseLayout_CWMQKIS_.mjs';
/* empty css                         */

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$5 = createAstro("https://fatbobman.com");
const $$RecentPosts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$RecentPosts;
  const { lang } = Astro2.props;
  const posts = await dataOperator.fetchFilteredPosts(lang, PostVisibility.LIST_VISIBLE, 8);
  const idAndURLs = posts.map((post) => ({
    id: post.slug,
    path: urlHelper.getPostPathBySlug(post.slug)
  }));
  const moreArticles = lang === Lang.ZH ? "\u66F4\u591A\u6587\u7AE0" : "More Articles";
  const postsCount = posts.length;
  const fontWide = lang === Lang.ZH ? "tracking-wide" : "";
  return renderTemplate(_a || (_a = __template(["", '<section class=""> ', ' <div class="text-center py-2"> <a', "", "> ", " </a> </div> </section> <script>(function(){", "\n  document.addEventListener('DOMContentLoaded', () => {\n    idAndURLs.map((idAndURL) => {\n      setPostClickURL(idAndURL.id, idAndURL.path);\n    });\n  });\n\n  function setPostClickURL(postId, path) {\n    const div = document.getElementById(postId);\n    if (div) {\n      div.addEventListener('click', function (e) {\n        // \u4F7F\u7528\u7C7B\u578B\u65AD\u8A00\n        const target = e.target;\n        if (target && !target.closest('a')) {\n          window.location.href = path;\n        }\n      });\n    }\n  }\n})();<\/script>"])), maybeRenderHead(), posts.map((post, index) => renderTemplate`<div> <div class="max-w-4xl px-2 sm:px-4 py-6 mx-auto rounded-lg cursor-pointer sm:hover:bg-block group"${addAttribute(post.slug, "id")}> <div> <div${addAttribute(`text-xl font-bold text-heading group-hover:text-secondary group-hover:dark:text-white ${fontWide}`, "class")}>${post.data.title}</div> <div class="flex  justify-start items-center space-x-2 mt-2"> <span class="text-xxs text-muted font-bold">${dataFormat(post.data.publishDate.toISOString(), lang)}</span> ${post.data.tags && post.data.tags.map((tag) => renderTemplate`<a class="text-xxs font-semibold mx-2 text-secondary hover:text-heading pointer-events-auto"${addAttribute(urlHelper.getTagPathByLangAndTag(lang, tag), "href")}>
#${tag} </a>`)} </div> ${post.data.author && renderTemplate`<p class="mt-2 font-light text-sm">by <span class="font-medium italic">${post.data.author}</span></p>`} <p${addAttribute(`mt-3 text-muted dark:text-gray-400/90 text-sm leading-loose line-clamp-4 group-hover:sm:text-heading ${fontWide}`, "class")}>${post.data.description}</p> </div> </div> ${index === 1 ? renderTemplate`<aside aria-label="advertisement" role="complementary"> <div class="dynamic-ad-card"></div> </aside>` : index !== postsCount - 1 && renderTemplate`<div class="py-2 w-5/6 mx-auto"> <hr class="border-0 border-b border-dashed border-gray-300 dark:border-gray-400/20"> </div>`} </div>`), addAttribute(`text-secondary text-sm font-medium px-2 sm:px-4 pb-2 uppercase hover:text-heading ${fontWide}`, "class"), addAttribute(urlHelper.getPathByLangAndUrlType(lang, URLType.POSTS, false) + "#more-artical-start", "href"), moreArticles, defineScriptVars({ idAndURLs }));
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/RecentPosts.astro", undefined);

const $$Astro$4 = createAstro("https://fatbobman.com");
const $$CuratedCollection = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$CuratedCollection;
  const { lang } = Astro2.props;
  const collections = (await dataOperator.fetchCollectionsInHomePageByLang(lang)).slice(0, 8);
  const title = lang === Lang.ZH ? "\u7CBE\u9009\u5408\u96C6" : "Curated Collection";
  const titleFontWide = lang === Lang.ZH ? "tracking-widest" : "";
  const fontWide = lang === Lang.ZH ? "tracking-widest" : "";
  return renderTemplate`${maybeRenderHead()}<section> <div class="container p-2 sm:p-4 mx-auto space-y-8"> <div class="space-y-2 text-center"> <a${addAttribute(urlHelper.getPathByLangAndUrlType(lang, URLType.COLLECTIONS, false), "href")}> <h2${addAttribute(`font-sans text-3xl font-bold text-default hover:text-secondary ${titleFontWide}`, "class")}>${title}</h2> </a> </div> <div class="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2"> ${collections.map((collection) => renderTemplate`<div class="flex flex-col bg-block rounded overflow-hidden border-[1px] dark:border-0 sm:border-gray-200/70 sm:hover:shadow-lg sm:hover:scale-105 sm:transition-transform sm:duration-200 group"> <a rel="noopener noreferrer"${addAttribute(urlHelper.getCollectionPathBySlugAndLang(collection.slug, lang), "href")}${addAttribute(collection.data.title, "aria-label")}> <picture class="object-cover w-full h-52"> <!-- 为不同屏幕尺寸提供多种图片版本 --> <source media="(max-width: 479px)"${addAttribute(collection.data.image + "?imageView2/0/w/300 1x, " + collection.data.image + "?imageView2/0/w/400 2x", "srcset")}> <source media="(max-width: 767px)"${addAttribute(collection.data.image + "?imageView2/0/w/400 1x, " + collection.data.image + "?imageView2/0/w/500 2x", "srcset")}> <source media="(max-width: 1024px)"${addAttribute(collection.data.image + "?imageView2/0/w/600 1x, " + collection.data.image + "?imageView2/0/w/700 2x", "srcset")}> <img${addAttribute(collection.data.image + "?imageView2/0/w/700", "src")}${addAttribute(collection.data.title, "alt")} class="object-cover w-full h-52" loading="lazy" decoding="async" width="700" height="300"> </picture> <div class="flex flex-col flex-1 p-6"> <p class="text-xs font-medium text-secondary">${collection.data.subtitle}</p> <h3${addAttribute(`flex-1 py-2 text-lg font-semibold leadi text-heading group-hover:text-secondary ${fontWide}`, "class")}> ${collection.data.title} </h3> </div> </a> </div>`)} </div> </div> </section>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/CuratedCollection.astro", undefined);

const $$Astro$3 = createAstro("https://fatbobman.com");
const $$LastestWeekly = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$LastestWeekly;
  const { lang } = Astro2.props;
  const weekly = weeklyHelper.getLatestWeekly(lang);
  const date = weekly !== null ? dataFormat(weekly.publishDate.toISOString(), lang) : "";
  const subtitle = weekly?.subtitle || "";
  const descrption = weekly?.description || "";
  const imageURL = "https://cdn.fatbobman.com/weekly/issue" + (weekly?.issue || "") + ".webp";
  const issue = (weekly?.issue || 0).toString().padStart(3, "0");
  const url = lang === Lang.ZH ? "/zh/weekly/issue-" + issue + "/" : "/en/weekly/issue-" + issue + "/";
  const readMore = lang === Lang.ZH ? "\u63A2\u7D22\u672C\u671F\u5185\u5BB9" : "Explore Full Issue";
  const weeklyName = "#" + issue;
  const fontWide = lang === Lang.ZH ? "tracking-wide" : "";
  return renderTemplate`${maybeRenderHead()}<section class="relative px-6 md:px-0 bg-block sm:mt-2 md:mt-0 rounded-lg overflow-hidden border-[1px] dark:border-[1px] border-gray-200/70 dark:border-gray-700/70 shadow-sm sm:shadow-lg md:hover:shadow-xl md:hover:scale-105 sm:transition-transform sm:duration-200 group"> <span class="absolute top-0 right-0 px-8 py-1 text-xs font-bold tracking-wider text-center uppercase whitespace-no-wrap origin-bottom-left transform rotate-45 -translate-y-full translate-x-1/3 bg-violet-600 text-gray-100 dark:text-heading">${issue}</span> <a rel="noopener noreferrer"${addAttribute(url, "href")} class="block max-w-3xl gap-3 mx-auto sm:max-w-full group hover:no-underline focus:no-underline md:grid md:grid-cols-12"> <picture class="critical-content object-cover w-full sm:h-full md:col-span-4 hidden md:block"> <!-- 为不同屏幕尺寸提供响应式图片 --> <source media="(max-width: 767px)"${addAttribute(imageURL + "?imageView2/0/w/500", "srcset")}> <source media="(max-width: 1024px)"${addAttribute(imageURL + "?imageView2/0/w/600", "srcset")}> <!-- 默认图片 --> <img${addAttribute(imageURL + "?imageView2/0/w/600", "src")}${addAttribute(subtitle, "alt")} class="critical-image object-cover w-full sm:h-full md:col-span-5" decoding="async" fetchpriority="high"> </picture> <h2 class="sr-only">${subtitle} - ${weeklyName}</h2> <div class="sm:px-4 md:px-6 py-6 space-y-2 md:col-span-8"> <h3${addAttribute(`text-2xl font-semibold sm:text-3xl text-heading group-hover:md:text-black dark:group-hover:md:text-white ${fontWide}`, "class")}> ${subtitle} </h3> <!-- <h4 class="text-default font-medium text-lg">
        {weeklyName}
      </h4> --> <div class="text-xxs font-semibold text-violet-600 dark:text-violet-400 flex items-center space-x-2"> <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> <span> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-2 h-2 inline-block mb-[2px] fill-current mr-[2px]"><path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l352 0 0 256c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256z"></path></svg> ${date} </span> <span class="text-gray-500/70 dark:text-gray-400/70">•</span> <span class="text-gray-500/70 dark:text-gray-400/70">
Issue #${issue} </span> </div> <div${addAttribute(`text-muted dark:text-gray-400/90 py-6 text-sm leading-loose group-hover:text-heading ${fontWide} `, "class")}> ${descrption} </div> <!-- <div class="hidden sm:inline-flex items-center py-4 space-x-2 text-sm text-secondary font-medium uppercase">
        {readMore}
      </div> --> <div${addAttribute(`inline-flex items-center px-4 py-2 text-sm font-medium text-heading border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-black/30 hover:bg-gray-100 hover:text-gray-900 hover:dark:text-white hover:border-gray-400 transition ease-in-out duration-200 ${fontWide}`, "class")}> ${readMore} <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12h14"></path> <path d="M12 5l7 7-7 7"></path> </svg> </div> </div> </a> </section>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/LastestWeekly.astro", undefined);

const $$Astro$2 = createAstro("https://fatbobman.com");
const $$LastestTips = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$LastestTips;
  const { lang } = Astro2.props;
  const allTips = await snippetOperator.fetchFilteredSnippets(lang, PostVisibility.LIST_VISIBLE);
  const tips = allTips.slice(0, 6);
  const title = lang === Lang.ZH ? "\u5C0F\u8D34\u58EB" : "Quick Tips";
  const moreTips = lang === Lang.ZH ? "\u66F4\u591A\u5C0F\u8D34\u58EB" : "More Tips";
  const tipURL = urlHelper.getPathByLangAndUrlType(lang, URLType.TIP, false);
  const titleFontWide = lang === Lang.ZH ? "tracking-widest" : "";
  const fontWide = lang === Lang.ZH ? "tracking-wide" : "";
  return renderTemplate`${maybeRenderHead()}<section> <div class="container p-2 sm:p-4 mx-auto space-y-8"> <div class="py-2 w-5/6 mx-auto"> <hr class="border-0 border-b border-dashed border-gray-300 dark:border-gray-400/20"> </div> <div class="space-y-2 text-center"> <a${addAttribute(urlHelper.getPathByLangAndUrlType(lang, URLType.TIP, false), "href")}> <h2${addAttribute(`font-sans text-2xl sm:text-3xl font-bold text-default hover:text-secondary ${titleFontWide}`, "class")}> ${title} </h2> </a> </div> <div class="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 md:gap-4"> ${tips.map((tip) => renderTemplate`<a class="rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
          hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600 flex items-stretch gap-2"${addAttribute("snippet/" + urlHelper.extractPostNameFromSlug(tip.slug) + "/", "href")}> <span${addAttribute(`font-medium text-sm text-heading ${fontWide}`, "class")}> <span class="hidden sm:inline-block text-xs mr-2 md:mr-1">${snippetOperator.getIconByTitle(tip.data.title)}</span> ${tip.data.title} </span> </a>`)} </div>  <div class="text-center mt-4"> <a${addAttribute(tipURL, "href")}${addAttribute(`text-secondary font-medium text-sm hover:text-heading uppercase ${fontWide}`, "class")}> ${moreTips} </a> </div> <div class="py-2 w-5/6 mx-auto"> <hr class="border-0 border-b border-dashed border-gray-300 dark:border-gray-400/20"> </div> </div> </section>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/LastestTips.astro", undefined);

const $$Astro$1 = createAstro("https://fatbobman.com");
const $$RecentWeeklyInline = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RecentWeeklyInline;
  const { lang } = Astro2.props;
  const weeklys = await weeklyHelper.getWeeklyList(lang);
  const isZH = lang === Lang.ZH;
  const allIssuesText = isZH ? "\u67E5\u770B\u5168\u90E8\u5468\u62A5" : "View All Issues";
  const allIssuesURL = isZH ? "/zh/weekly/" : "/en/weekly/";
  const items = weeklys.slice(1, 6).map((weekly) => ({
    issue: weekly.data.issue,
    title: weekly.data.subtitle,
    url: `${allIssuesURL}issue-${weekly.data.issue}/`
    // 生成相对路径  比如 /zh/weekly/issue-107/
  }));
  const fontWide = isZH ? "tracking-wide" : "";
  return renderTemplate`${maybeRenderHead()}<section aria-labelledby="recent-weekly-heading" class="relative my-6 sm:my-8" data-astro-cid-wyv5sf7c> <h2 id="recent-weekly-heading" class="sr-only" data-astro-cid-wyv5sf7c>Recent Weekly Issues</h2> <div class="flex items-center justify-between gap-4 border-y border-gray-200/70 dark:border-gray-700/60 bg-white/60 dark:bg-black/20 rounded-md px-3 sm:px-4 py-2" data-astro-cid-wyv5sf7c> <!-- left: auto-scrolling weekly titles --> <div class="min-w-0 flex-1 relative overflow-hidden pb-3" data-astro-cid-wyv5sf7c> <div id="weekly-scroll-container" class="flex transition-transform duration-500 ease-in-out" data-astro-cid-wyv5sf7c> ${items.map((it) => renderTemplate`<div class="weekly-item flex-shrink-0 w-full flex items-center justify-center px-2" data-astro-cid-wyv5sf7c> <a${addAttribute(it.url, "href")}${addAttribute(`inline-flex items-center text-xs sm:text-sm font-semibold text-heading/90 hover:text-secondary w-full ${fontWide}`, "class")}${addAttribute(`Issue #${it.issue}: ${it.title}`, "aria-label")} data-astro-cid-wyv5sf7c> <span class="inline-flex items-center rounded-full border border-gray-300/70 dark:border-gray-600/60 px-2 py-[2px] mr-2 text-[10px] sm:text-xxs text-gray-700 dark:text-gray-300 bg-white/70 dark:bg-black/30 flex-shrink-0" data-astro-cid-wyv5sf7c>
#${it.issue} </span> <span class="truncate min-w-0 flex-1 text-center" data-astro-cid-wyv5sf7c>${it.title}</span> </a> </div>`)} </div> <!-- scroll indicators --> <div class="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1" data-astro-cid-wyv5sf7c> ${items.map((_, idx) => renderTemplate`<button${addAttribute(`weekly-indicator w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === 0 ? "bg-secondary" : "bg-gray-300 dark:bg-gray-600"}`, "class")}${addAttribute(idx, "data-index")}${addAttribute(`Go to issue ${idx + 1}`, "aria-label")} data-astro-cid-wyv5sf7c></button>`)} </div> </div> <!-- right: all issues --> <a${addAttribute(allIssuesURL, "href")}${addAttribute(`shrink-0 inline-flex items-center text-xxs sm:text-xs font-medium uppercase text-secondary hover:text-heading ${fontWide}`, "class")} data-astro-cid-wyv5sf7c> ${allIssuesText} <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-astro-cid-wyv5sf7c> <path d="M5 12h14" data-astro-cid-wyv5sf7c></path><path d="M12 5l7 7-7 7" data-astro-cid-wyv5sf7c></path> </svg> </a> </div> </section>  ${renderScript($$result, "/Users/yangxu/Astro/FatBlog/src/components/widgets/RecentWeeklyInline.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/RecentWeeklyInline.astro", undefined);

const $$Astro = createAstro("https://fatbobman.com");
const $$HomeLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HomeLayout;
  const { lang, urlType = URLType.LANGUAGE_ROOT } = Astro2.props;
  const metadata = await metaDataHelper.getMetaDataByLangAndUrlType(lang, urlType);
  const h1Title = lang === Lang.ZH ? "\u9996\u9875" : "Home";
  const posts = await dataOperator.fetchFilteredPosts(lang, PostVisibility.LIST_VISIBLE, 8);
  const jsonLD = jsonLdHelper.generateSiteJsonLd(lang, posts);
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "language": lang, "metadata": metadata, "h1Title": h1Title, "jsonLD": jsonLD }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="space-y-6"> ${renderComponent($$result2, "LastestWeekly", $$LastestWeekly, { "lang": lang })} ${renderComponent($$result2, "RecentWeeklyInline", $$RecentWeeklyInline, { "lang": lang })} <!-- <WeeklySubscribe lang={lang} top={6} bottom={0}/> --> ${renderComponent($$result2, "RecentPosts", $$RecentPosts, { "lang": lang })} ${renderComponent($$result2, "AdsLoader", $$AdsNewLoader, { "lang": lang })} ${renderComponent($$result2, "LastestTips", $$LastestTips, { "lang": lang })} ${renderComponent($$result2, "CuratedCollection", $$CuratedCollection, { "lang": lang })} </div>  `, "footer": ($$result2) => renderTemplate`${renderComponent($$result2, "Footer", $$Footer, { "slot": "footer", "lang": lang })}`, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Header", $$Header, { "slot": "header", "lang": lang })}` })}`;
}, "/Users/yangxu/Astro/FatBlog/src/layouts/HomeLayout.astro", undefined);

export { $$HomeLayout as $ };
