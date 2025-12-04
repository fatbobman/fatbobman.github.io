import { e as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, u as unescapeHTML, d as defineScriptVars, a as renderComponent } from './astro/server_C0quZjbu.mjs';
import 'kleur/colors';
import { $ as $$PageLayout } from './PageLayout_C5hChsBd.mjs';
import { L as Lang, u as urlHelper } from './images_Ck81mHQe.mjs';
import 'clsx';
import { b as blogData, m as metaDataHelper } from './metaData_Cr-Y257r.mjs';
import { $ as $$Footer, a as $$Header } from './Footer_B4u8gcKS.mjs';
import fs from 'fs';
import yaml from 'js-yaml';
import { $ as $$HeaderURLCopyerJS } from './HeaderURLCopyerJS_CW82WLfD.mjs';

const $$Astro$4 = createAstro("https://fatbobman.com");
const $$WeeklySubscribe = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$WeeklySubscribe;
  const { lang, bottom = 0, top = 0, anchor } = Astro2.props;
  const subscribeText = lang === Lang.ZH ? "\u8BA2\u9605\u5468\u62A5" : "Subscribe";
  const placeholder = lang === Lang.ZH ? "\u8BF7\u8F93\u5165\u90AE\u7BB1" : "Enter email";
  const tip = lang === Lang.ZH ? "\u6BCF\u5468\u7CBE\u9009 Swift \u4E0E SwiftUI \u7CBE\u534E\uFF01" : "Weekly Swift & SwiftUI highlights!";
  const fontWide = lang === Lang.ZH ? "font-wide" : "";
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`w-full mx-auto text-center pb-${bottom} sm:pb-${bottom + 6} pt-${top}`, "class")}> <div id="custom-substack-embed"${addAttribute(subscribeText, "data-subscribeText")}${addAttribute(placeholder, "data-placeholder")}${addAttribute(anchor, "data-anchor")} style="opacity: 0; transition: opacity 0.3s;"></div> <iframe class="sm:w-80 w-[480px] mx-auto dark:opacity-80 dark:rounded-lg dark:shadow-2xl dark:border-gray-600" src="https://weekly.fatbobman.com/embed" height="320" style="border:1px solid #EEE; background:white; width: 100%; max-width: 480px;"></iframe> <div${addAttribute(`text-xs font-medium text-heading p-4 ${fontWide}`, "class")}>${tip}</div> </div>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/WeeklySubscribe.astro", undefined);

const $$Astro$3 = createAstro("https://fatbobman.com");
const $$CollectionArticleTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$CollectionArticleTitle;
  const { lang, collection } = Astro2.props;
  lang === Lang.ZH ? "\u4E1C\u5761\u8098\u5B50" : "Fatbobman";
  const imageURL = collection.data.image;
  const fontWide = lang === Lang.ZH ? "tracking-wide" : "";
  return renderTemplate`${maybeRenderHead()}<div class="mx-auto space-y-4 text-center pt-16 pb-4" style="width:80%"> <h1${addAttribute(`text-3xl font-bold leadi md:text-4xl text-heading ${fontWide}`, "class")}>${collection.data.title}</h1> </div> <div class="space-y-2"> <picture class="w-full aspect-w-16 aspect-h-9"> <!-- 为不同屏幕尺寸提供响应式图片 --> <source media="(max-width: 479px)"${addAttribute(imageURL + "?imageView2/0/w/300 1x, " + imageURL + "?imageView2/0/w/400 2x", "srcset")}> <source media="(max-width: 767px)"${addAttribute(imageURL + "?imageView2/0/w/400 1x, " + imageURL + "?imageView2/0/w/500 2x", "srcset")}> <source media="(max-width: 1024px)"${addAttribute(imageURL + "?imageView2/0/w/600 1x, " + imageURL + "?imageView2/0/w/700 2x", "srcset")}> <img${addAttribute(imageURL + "?imageView2/0/w/1000", "src")} alt="Responsive image" class="object-cover w-full h-full" decoding="async" fetchpriority="high" width="1200" height="675"> </picture> ${collection.data.imageAuthor && renderTemplate`<p class="text-muted text-xs text-center">${unescapeHTML(collection.data.imageAuthor)}</p>`} </div>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/CollectionArticleTitle.astro", undefined);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw) }));
var _a;
const $$Astro$2 = createAstro("https://fatbobman.com");
const $$AdsLoader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$AdsLoader;
  const { lang } = Astro2.props;
  const url = lang === Lang.EN ? "https://fatbobman.com/ads/en" : "https://fatbobman.com/ads/zh";
  return renderTemplate(_a || (_a = __template(["<script>(function(){", "\n  // \u6839\u636E\u4E2D\u82F1\u6587\u5BF9\u5E94\u4E0D\u540C\u7684 adCacheKey\n  const adCacheKey = 'dynamicAdCache' + (window.location.pathname.includes('/zh/') ? 'ZH' : 'EN');\n\n  // \u5C1D\u8BD5\u4ECE\u7F13\u5B58\u4E2D\u83B7\u53D6\u5E7F\u544A\n  let cachedAd = null;\n  try {\n    const cachedData = localStorage.getItem(adCacheKey);\n    if (cachedData) {\n      cachedAd = JSON.parse(cachedData);\n    }\n  } catch (e) {\n    console.warn('Failed to parse cached ad:', e);\n  }\n  const now = Date.now();\n\n  // \u68C0\u67E5\u7F13\u5B58\u662F\u5426\u6709\u6548\uFF1A1. \u5B58\u5728 2. \u672A\u8FC7\u671F\n  if (cachedAd && cachedAd.expiresAt && cachedAd.expiresAt > now) {\n    console.log('Using cached ad');\n    console.log(cachedAd.expiresAt - now);\n    // \u5982\u679C\u7F13\u5B58\u6709\u6548\uFF0C\u76F4\u63A5\u4F7F\u7528\u7F13\u5B58\u7684\u5E7F\u544A\n    renderAd(cachedAd.content);\n  } else {\n    console.log('Fetching ad from the server');\n    // \u5982\u679C\u7F13\u5B58\u65E0\u6548\uFF0C\u4ECE\u670D\u52A1\u5668\u83B7\u53D6\u5E7F\u544A\n    fetch(url, {\n      headers: {\n        'Accept': 'text/html',\n      },\n      cache: 'no-cache'\n    })\n      .then(response => {\n        const maxAgeMatch = response.headers.get('Cache-Control')?.match(/max-age=(\\d+)/);\n        const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : 0;\n\n        if (!response.ok || maxAge <= 0) {\n          throw new Error('Invalid response or missing Cache-Control');\n        }\n\n        return response.text().then(adContent => {\n          // const expiresAt = now + maxAge * 1000; // \u8BA1\u7B97\u5931\u6548\u65F6\u95F4\n          // \u89E3\u6790 max-age\n          // const cc = response.headers.get('Cache-Control') || '';\n          // const maxAge = parseInt((cc.match(/(?:^|,)\\s*max-age=(\\d+)/)?.[1] ?? '0'), 10);\n\n          // // \u8BFB\u53D6 CDN Age \u4E0E\u670D\u52A1\u7AEF\u65F6\u95F4\n          // const age = parseInt(response.headers.get('Age') || '0', 10);\n          // // const serverDate = response.headers.get('Date');\n\n          // // \u8BA1\u7B97\u5269\u4F59 TTL\uFF08\u4F18\u5148\u7528 Age \u62B5\u6263\uFF09\n          // const ttlLeftMs = Math.max(0, (maxAge - age) * 1000);\n\n          // // \u5931\u6548\u65F6\u95F4\uFF1A\u4EE5\u5F53\u524D\u672C\u5730\u65F6\u95F4\u52A0\u5269\u4F59 TTL\uFF08\u82E5\u8981\u5B8C\u5168\u6309\u670D\u52A1\u7AEF\u65F6\u95F4\uFF0C\u53EF\u7528 serverDate \u505A\u57FA\u7EBF\uFF09\n          // const expiresAt = Date.now() + ttlLeftMs;\n\n          // \u5931\u6548\u65F6\u95F4\uFF1A\u56FA\u5B9A20\u5206\u949F\n          const expiresAt = Date.now() + 20 * 60 * 1000; // 20\u5206\u949F\n\n          // \u7F13\u5B58\u5E7F\u544A\u5185\u5BB9\n          localStorage.setItem(adCacheKey, JSON.stringify({ content: adContent, expiresAt }));\n          // \u6E32\u67D3\u5E7F\u544A\n          renderAd(adContent);\n        });\n      })\n      .catch(error => console.error('Error loading the ad:', error));\n  }\n\n  // \u6E32\u67D3\u5E7F\u544A\u51FD\u6570\n  function renderAd(html) {\n    const adSlots = document.querySelectorAll('.dynamic-ad-container');\n    adSlots.forEach(slot => {\n      slot.innerHTML = html;\n    });\n  }\n})();<\/script>"], ["<script>(function(){", "\n  // \u6839\u636E\u4E2D\u82F1\u6587\u5BF9\u5E94\u4E0D\u540C\u7684 adCacheKey\n  const adCacheKey = 'dynamicAdCache' + (window.location.pathname.includes('/zh/') ? 'ZH' : 'EN');\n\n  // \u5C1D\u8BD5\u4ECE\u7F13\u5B58\u4E2D\u83B7\u53D6\u5E7F\u544A\n  let cachedAd = null;\n  try {\n    const cachedData = localStorage.getItem(adCacheKey);\n    if (cachedData) {\n      cachedAd = JSON.parse(cachedData);\n    }\n  } catch (e) {\n    console.warn('Failed to parse cached ad:', e);\n  }\n  const now = Date.now();\n\n  // \u68C0\u67E5\u7F13\u5B58\u662F\u5426\u6709\u6548\uFF1A1. \u5B58\u5728 2. \u672A\u8FC7\u671F\n  if (cachedAd && cachedAd.expiresAt && cachedAd.expiresAt > now) {\n    console.log('Using cached ad');\n    console.log(cachedAd.expiresAt - now);\n    // \u5982\u679C\u7F13\u5B58\u6709\u6548\uFF0C\u76F4\u63A5\u4F7F\u7528\u7F13\u5B58\u7684\u5E7F\u544A\n    renderAd(cachedAd.content);\n  } else {\n    console.log('Fetching ad from the server');\n    // \u5982\u679C\u7F13\u5B58\u65E0\u6548\uFF0C\u4ECE\u670D\u52A1\u5668\u83B7\u53D6\u5E7F\u544A\n    fetch(url, {\n      headers: {\n        'Accept': 'text/html',\n      },\n      cache: 'no-cache'\n    })\n      .then(response => {\n        const maxAgeMatch = response.headers.get('Cache-Control')?.match(/max-age=(\\\\d+)/);\n        const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : 0;\n\n        if (!response.ok || maxAge <= 0) {\n          throw new Error('Invalid response or missing Cache-Control');\n        }\n\n        return response.text().then(adContent => {\n          // const expiresAt = now + maxAge * 1000; // \u8BA1\u7B97\u5931\u6548\u65F6\u95F4\n          // \u89E3\u6790 max-age\n          // const cc = response.headers.get('Cache-Control') || '';\n          // const maxAge = parseInt((cc.match(/(?:^|,)\\\\s*max-age=(\\\\d+)/)?.[1] ?? '0'), 10);\n\n          // // \u8BFB\u53D6 CDN Age \u4E0E\u670D\u52A1\u7AEF\u65F6\u95F4\n          // const age = parseInt(response.headers.get('Age') || '0', 10);\n          // // const serverDate = response.headers.get('Date');\n\n          // // \u8BA1\u7B97\u5269\u4F59 TTL\uFF08\u4F18\u5148\u7528 Age \u62B5\u6263\uFF09\n          // const ttlLeftMs = Math.max(0, (maxAge - age) * 1000);\n\n          // // \u5931\u6548\u65F6\u95F4\uFF1A\u4EE5\u5F53\u524D\u672C\u5730\u65F6\u95F4\u52A0\u5269\u4F59 TTL\uFF08\u82E5\u8981\u5B8C\u5168\u6309\u670D\u52A1\u7AEF\u65F6\u95F4\uFF0C\u53EF\u7528 serverDate \u505A\u57FA\u7EBF\uFF09\n          // const expiresAt = Date.now() + ttlLeftMs;\n\n          // \u5931\u6548\u65F6\u95F4\uFF1A\u56FA\u5B9A20\u5206\u949F\n          const expiresAt = Date.now() + 20 * 60 * 1000; // 20\u5206\u949F\n\n          // \u7F13\u5B58\u5E7F\u544A\u5185\u5BB9\n          localStorage.setItem(adCacheKey, JSON.stringify({ content: adContent, expiresAt }));\n          // \u6E32\u67D3\u5E7F\u544A\n          renderAd(adContent);\n        });\n      })\n      .catch(error => console.error('Error loading the ad:', error));\n  }\n\n  // \u6E32\u67D3\u5E7F\u544A\u51FD\u6570\n  function renderAd(html) {\n    const adSlots = document.querySelectorAll('.dynamic-ad-container');\n    adSlots.forEach(slot => {\n      slot.innerHTML = html;\n    });\n  }\n})();<\/script>"])), defineScriptVars({ url }));
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/AdsLoader.astro", undefined);

function getCollectionItem(lang, collectionSlug) {
  const id = urlHelper.extractPostNameFromSlug(collectionSlug);
  const url = `src/collectionList/${id}.yaml`;
  if (!fs.existsSync(url)) {
    return undefined;
  }
  const collectionItem = yaml.load(fs.readFileSync(url, "utf8"));
  if (collectionItem !== undefined) {
    return collectionItem;
  } else {
    return undefined;
  }
}
function getPost(lang, postSlug) {
  const blogs = lang === Lang.EN ? blogData._enPosts : blogData._zhPosts;
  const post = blogs.find((post2) => post2.slug === postSlug);
  if (post !== undefined) {
    return post;
  } else {
    return undefined;
  }
}

const $$Astro$1 = createAstro("https://fatbobman.com");
const $$CollectionSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CollectionSection;
  const { lang, section } = Astro2.props;
  const title = lang === Lang.EN ? section.title_en : section.title_zh;
  const description = lang === Lang.EN ? section.description_en : section.description_zh;
  const postSlugs = section.posts.map((id2) => `${lang}/${id2}`);
  const id = title.toLowerCase().replace(/\s/g, "-");
  const fontWide = lang === Lang.ZH ? "font-wide" : "";
  return renderTemplate`${maybeRenderHead()}<div> <h3${addAttribute(id, "id")}${addAttribute(fontWide, "class")}>${title}</h3> <p>${(description !== undefined || description !== "") && description}</p> <ul> ${postSlugs.map((slug) => {
    const post = getPost(lang, slug);
    return post && renderTemplate`<li> <a${addAttribute(urlHelper.getPostPathBySlug(post.slug), "href")} class="hover:text-secondary"> ${post.data.title} </a> <p>${post.data.description}</p> </li>`;
  })} </ul> </div>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/CollectionSection.astro", undefined);

const $$Astro = createAstro("https://fatbobman.com");
const $$CollectionLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CollectionLayout;
  const { lang, baseCSS = undefined, pageCSS = "", collection } = Astro2.props;
  const { Content, remarkPluginFrontmatter } = await collection.render();
  const meta = await metaDataHelper.getMetaDataByCollection(collection);
  const sections = getCollectionItem(lang, collection.slug)?.sections;
  const fontWideForChinese = lang === Lang.ZH ? "prose-headings:tracking-wide prose-p:tracking-wide prose-a:tracking-wide" : "";
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "metadata": meta, "language": lang, "baseCSS": baseCSS, "pageCSS": pageCSS }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "CollectionArticleTitle", $$CollectionArticleTitle, { "lang": lang, "collection": collection })} ${maybeRenderHead()}<article${addAttribute(`prose dark:prose-invert mx-auto w-full ${fontWideForChinese}`, "class")}> <div> ${renderComponent($$result2, "Content", Content, {})} </div> <aside aria-label="advertisement" role="complementary"> <div class="dynamic-ad-container py-10"></div> </aside> ${renderComponent($$result2, "AdsLoader", $$AdsLoader, { "lang": lang })} ${sections && sections.map((section) => renderTemplate`${renderComponent($$result2, "CollectionSection", $$CollectionSection, { "lang": lang, "section": section })}`)} </article> ${renderComponent($$result2, "WeeklySubscribe", $$WeeklySubscribe, { "lang": lang, "bottom": 0, "top": 8, "anchor": "weekly-subscribe-anchor" })} <div id="weekly-subscribe-anchor" class="pb-16"></div>    ${renderComponent($$result2, "HeaderURLCopyerJS", $$HeaderURLCopyerJS, { "lang": lang })}   `, "footer": ($$result2) => renderTemplate`${renderComponent($$result2, "Footer", $$Footer, { "slot": "footer", "lang": lang })}`, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Header", $$Header, { "slot": "header", "lang": lang })}` })}`;
}, "/Users/yangxu/Astro/FatBlog/src/layouts/CollectionLayout.astro", undefined);

export { $$CollectionLayout as $ };
