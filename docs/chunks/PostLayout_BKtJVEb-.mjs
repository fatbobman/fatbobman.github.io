import { e as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, a as renderComponent, F as Fragment, b as renderScript } from './astro/server_C0quZjbu.mjs';
import 'kleur/colors';
import { $ as $$PageLayout } from './PageLayout_C5hChsBd.mjs';
import { L as Lang, u as urlHelper, D as DataSourceType } from './images_Ck81mHQe.mjs';
import { d as dataOperator, m as metaDataHelper } from './metaData_Cr-Y257r.mjs';
import { $ as $$Footer, a as $$Header } from './Footer_B4u8gcKS.mjs';
import { d as dataFormat } from './languages_C_U14EfB.mjs';
import { $ as $$CopyCodeSvg, a as $$BottomCardAds, b as $$CopyCodeButtonJS, c as $$Comment, d as $$TOC, e as $$SideBar } from './BottomCardAds_fyfoxq7y.mjs';
import 'clsx';
import { $ as $$HeaderURLCopyerJS } from './HeaderURLCopyerJS_CW82WLfD.mjs';
import { $ as $$AdsNewLoader } from './AdsNewLoader_CevgxE9A.mjs';
import { j as jsonLdHelper } from './BaseLayout_CWMQKIS_.mjs';
import { $ as $$SubscriberAndBuyCoffee } from './SubscriberAndBuyCoffee_BCJ5jjve.mjs';

const $$Astro$3 = createAstro("https://fatbobman.com");
const $$ArticleTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ArticleTitle;
  const { lang, post } = Astro2.props;
  const tags = post.data.tags || [];
  const date = dataFormat(post.data.publishDate.toISOString(), lang);
  let authorName = lang === Lang.ZH ? "\u4E1C\u5761\u8098\u5B50" : "Fatbobman";
  if (post.data.author) {
    authorName = post.data.author;
  }
  let authorURL = "https://x.com/intent/follow?screen_name=fatbobman";
  if (post.data.authorLink) {
    authorURL = post.data.authorLink;
  }
  const updateText = lang === Lang.ZH ? "\u66F4\u65B0\u4E8E " : "Updated on ";
  const publishText = lang === Lang.ZH ? "\u53D1\u8868\u4E8E " : "Published on ";
  const otherLang = lang === Lang.ZH ? "#English" : "#\u4E2D\u6587\u7248";
  const otherLangURL = dataOperator.getOtherLanguageRelateWithPostSlug(post.slug);
  const fontWide = lang === Lang.ZH ? "tracking-wide" : "";
  const languageFontWide = lang === Lang.EN ? "tracking-wide" : "";
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`mx-auto space-y-4 text-center py-10 ${fontWide}`, "class")} style="width:80%"> <div class="flex mx-auto justify-center"> <div class="flex mx-auto justify-center"> ${tags.map((tag) => renderTemplate`<a class="text-xs font-medium sm:font-semibold mx-2 text-muted hover:text-secondary tracking-normal"${addAttribute(urlHelper.getTagPathByLangAndTag(lang, tag), "href")}>
#${tag} </a>`)} ${otherLangURL && renderTemplate`<a${addAttribute(`text-xs font-medium sm:font-semibold mx-2 text-muted hover:text-secondary ${languageFontWide}`, "class")}${addAttribute(otherLangURL, "href")} id="language-switcher-for-topic"> ${otherLang} </a>`} </div> </div> <h1${addAttribute(`text-2xl font-bold leadi md:text-3xl text-heading ${fontWide}`, "class")}>${post.data.title}</h1> <p class="text-sm text-default"> <a itemprop="author"${addAttribute(authorURL, "href")} target="_blank" class="hover:text-secondary font-medium">${authorName}</a> <!-- <time datetime={\`\${post.data.publishDate.toISOString()}\`}>{date}</time> --> </p> <p class="text-xs text-muted"> ${publishText}<time${addAttribute(`${post.data.publishDate.toISOString()}`, "datetime")}>${date}</time> ${post.data.updateDate && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <span> ${updateText} </span> <time${addAttribute(`${post.data.updateDate.toISOString()}`, "datetime")}> ${dataFormat(post.data.updateDate.toISOString(), lang)} </time> ` })}`} </p> </div>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/ArticleTitle.astro", undefined);

const $$Astro$2 = createAstro("https://fatbobman.com");
const $$RelatedPosts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$RelatedPosts;
  const { lang, post } = Astro2.props;
  let relatedPosts = await dataOperator.getRelatedPostsbySlugs(post.data.relatedPosts || []);
  let posts = relatedPosts.sort(() => Math.random() - 0.5).slice(0, 4);
  const relateText = lang === Lang.EN ? "Recommended Reading" : "\u5EF6\u4F38\u9605\u8BFB";
  const fontWide = lang === Lang.ZH ? "font-wide" : "";
  return renderTemplate`${posts.length > 0 && renderTemplate`${maybeRenderHead()}<section class="py-10" id="related-posts"><!-- Section 标题：与正文区分，增加层次感 --><div class="flex items-center gap-2 mb-6 justify-center text-gray-400 dark:text-gray-500"><span class="h-px w-8 bg-gray-200 dark:bg-gray-700"></span><span class="text-xs font-bold uppercase tracking-widest">${relateText}</span><span class="h-px w-8 bg-gray-200 dark:bg-gray-700"></span></div><!-- 网格布局：2列 (移动端 1列太长，直接 2列更紧凑) --><div class="grid grid-cols-1 md:grid-cols-2 gap-4">${posts.map((post2) => renderTemplate`<a${addAttribute(post2.url, "href")} class="
                group relative flex flex-col justify-center px-5 py-4 h-full
                bg-white dark:bg-gray-900/50 
                border border-gray-200 dark:border-gray-700/60 rounded-xl
                hover:border-orange-400/50 dark:hover:border-blue-500/50
                hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] dark:hover:shadow-none
                transition-all duration-300
              "><!-- 装饰：左上角的小点或图标，增加精致感 --><div class="absolute top-4 left-3 w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-orange-500 dark:group-hover:bg-blue-500 transition-colors"></div><div class="flex items-start justify-between gap-3 pl-2"><!-- 标题 --><span${addAttribute(`text-[15px] leading-relaxed font-medium text-gray-700 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors ${fontWide}`, "class")}>${post2.name}</span><!-- 箭头图标：Hover 时平移出现 --><svg class="w-4 h-4 text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg></div></a>`)}</div></section>`}`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/RelatedPosts.astro", undefined);

const $$OpenInNewWindowJSForOtherSite = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderScript($$result, "/Users/yangxu/Astro/FatBlog/src/components/widgets/OpenInNewWindowJSForOtherSite.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/OpenInNewWindowJSForOtherSite.astro", undefined);

const $$Astro$1 = createAstro("https://fatbobman.com");
const $$BottomTags = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$BottomTags;
  const { lang, post } = Astro2.props;
  const tags = post.data.tags || [];
  return renderTemplate`<!-- 视觉分割线 -->${maybeRenderHead()}<div class="w-24 h-px bg-gray-200 dark:bg-gray-700 mx-auto mt-8 mb-6"></div> <!-- 标签容器：居中 --> <div class="flex flex-wrap justify-center items-center gap-2 mb-10"> <span class="text-xs font-medium text-gray-400 uppercase tracking-widest mr-2">Tags</span> ${tags.map((tag) => renderTemplate`<a${addAttribute(urlHelper.getTagPathByLangAndTag(lang, tag), "href")} class="text-xs font-medium sm:font-semibold mx-2 text-muted hover:text-secondary tracking-normal"> <span class="opacity-50">#</span>${tag} </a>`)} </div>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/BottomTags.astro", undefined);

const $$Astro = createAstro("https://fatbobman.com");
const $$PostLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostLayout;
  const { lang, baseCSS = undefined, pageCSS = "", post } = Astro2.props;
  const { Content, remarkPluginFrontmatter } = await post.render();
  const meta = await metaDataHelper.getMetaDataByPost(post);
  const jsonLD = jsonLdHelper.generateJsonLd(post, meta, lang);
  const fontWideForChinese = lang === Lang.ZH ? "prose-headings:tracking-wide prose-p:tracking-wide prose-a:tracking-wide" : "";
  lang === Lang.ZH ? "tracking-wide" : "";
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "metadata": meta, "language": lang, "baseCSS": baseCSS, "pageCSS": pageCSS, "jsonLD": jsonLD }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "ArticleTitle", $$ArticleTitle, { "lang": lang, "post": post })} ${renderComponent($$result2, "CopyCodeSvg", $$CopyCodeSvg, {})} ${maybeRenderHead()}<div class="relative" id="article-area"> <article${addAttribute(`prose dark:prose-invert mx-auto w-full ${fontWideForChinese}`, "class")}> <div> ${renderComponent($$result2, "Content", Content, {})} </div> </article> ${renderComponent($$result2, "BottomCardAds", $$BottomCardAds, {})} ${renderComponent($$result2, "BottomTags", $$BottomTags, { "lang": lang, "post": post })} ${renderComponent($$result2, "RelatedPosts", $$RelatedPosts, { "lang": lang, "post": post })} <!-- <BuymeacoffeeInPost lang={lang} /> --> <!-- <WeeklySubscribe lang={lang} bottom={0} top={8} anchor='related-posts'/> --> <!-- <Author lang={lang} /> --> ${renderComponent($$result2, "SubscriberAndBuyCoffee", $$SubscriberAndBuyCoffee, { "lang": lang })} ${renderComponent($$result2, "HeaderURLCopyerJS", $$HeaderURLCopyerJS, { "lang": lang })} ${renderComponent($$result2, "CopyCodeButtonJS", $$CopyCodeButtonJS, {})} ${renderComponent($$result2, "AdsLoader", $$AdsNewLoader, { "lang": lang })} ${renderComponent($$result2, "OpenInNewWindowJSForOtherSite", $$OpenInNewWindowJSForOtherSite, {})} <!-- <LeaveFeedback lang={lang} /> --> <!-- <BottomWeeklySubscribe lang={lang} /> --> ${renderComponent($$result2, "Comment", $$Comment, { "commentID": post.data.commentID, "lang": lang, "source": DataSourceType.POST, "anchor": "card-advertisement" })} ${renderComponent($$result2, "TOC", $$TOC, { "body": post.body, "source": DataSourceType.POST })} ${renderComponent($$result2, "SideBar", $$SideBar, { "lang": lang, "post": post, "source": DataSourceType.POST })} </div>  `, "footer": ($$result2) => renderTemplate`${renderComponent($$result2, "Footer", $$Footer, { "slot": "footer", "lang": lang })}`, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Header", $$Header, { "slot": "header", "lang": lang })}` })}`;
}, "/Users/yangxu/Astro/FatBlog/src/layouts/PostLayout.astro", undefined);

export { $$PostLayout as $ };
