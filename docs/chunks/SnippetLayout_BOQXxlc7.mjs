import { e as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, a as renderComponent } from './astro/server_C0quZjbu.mjs';
import 'kleur/colors';
import { $ as $$PageLayout } from './PageLayout_C5hChsBd.mjs';
import { L as Lang, u as urlHelper, D as DataSourceType } from './images_Ck81mHQe.mjs';
import { m as metaDataHelper } from './metaData_Cr-Y257r.mjs';
import { $ as $$Footer, a as $$Header } from './Footer_B4u8gcKS.mjs';
import 'clsx';
import { d as dataFormat } from './languages_C_U14EfB.mjs';
import { s as snippetOperator } from './snippets_C28dQPqY.mjs';
import { $ as $$HeaderURLCopyerJS } from './HeaderURLCopyerJS_CW82WLfD.mjs';
import { $ as $$CopyCodeSvg, a as $$BottomCardAds, b as $$CopyCodeButtonJS, e as $$SideBar, d as $$TOC, c as $$Comment } from './BottomCardAds_fyfoxq7y.mjs';
import { $ as $$OpenInNewWindowJS } from './OpenInNewWindowJS_DLHSaa6l.mjs';
import { $ as $$AdsNewLoader } from './AdsNewLoader_CevgxE9A.mjs';
import { j as jsonLdHelper } from './BaseLayout_CWMQKIS_.mjs';
import { $ as $$SubscriberAndBuyCoffee } from './SubscriberAndBuyCoffee_BCJ5jjve.mjs';

const $$Astro$2 = createAstro("https://fatbobman.com");
const $$SnippetTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$SnippetTitle;
  const { lang, post } = Astro2.props;
  const otherLang = lang === Lang.ZH ? "#English" : "#\u4E2D\u6587\u7248";
  const otherLangURL = snippetOperator.getOtherLanguageRelate(lang, post.slug);
  let authorName = lang === Lang.ZH ? "\u4E1C\u5761\u8098\u5B50" : "Fatbobman";
  if (post.data.author) {
    authorName = post.data.author;
  }
  let authorURL = "https://x.com/intent/follow?screen_name=fatbobman";
  if (post.data.authorLink) {
    authorURL = post.data.authorLink;
  }
  const icon = snippetOperator.getIconByTitle(post.data.title);
  const date = dataFormat(post.data.publishDate.toISOString(), lang);
  return renderTemplate`${maybeRenderHead()}<div class="mx-auto space-y-4 text-center pt-10 pb-6"> <div class="flex mx-auto justify-center"> <a class="text-xs font-medium sm:font-semibold mx-2 text-muted hover:text-secondary"${addAttribute(otherLangURL, "href")} id="language-switcher-for-topic"> ${otherLang} </a> </div> <div class="flex mx-auto justify-center" style="width:80%;"> <h1 class="text-2xl font-bold leadi md:text-3xl text-heading inline-flex"> ${icon} <!-- <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 100 100" class="md:w-10 md:h-10 w-9 h-9"><path fill="#6b96d6" d="m38.32,33.93l42.14,30.83c5,3.68,6.07,10.71,2.39,15.71-3.68,5-10.71,6.07-15.71,2.39-.92-.68-1.74-1.52-2.39-2.39l-30.83-42.14c-1.03-1.4-.73-3.36.67-4.39,1.13-.83,2.65-.79,3.72,0Z"/><circle cx="38.98" cy="38.98" r="24.02" fill="#c9dcf4"/><path fill="#6b96d6" d="m38.98,64.99c-6.66,0-13.33-2.54-18.4-7.61-10.15-10.15-10.15-26.65,0-36.8,10.14-10.15,26.65-10.15,36.8,0,10.15,10.15,10.15,26.65,0,36.8-5.07,5.07-11.74,7.61-18.4,7.61Zm0-48.02c-5.64,0-11.28,2.15-15.57,6.44-8.59,8.59-8.59,22.56,0,31.14,8.59,8.58,22.56,8.59,31.14,0,8.59-8.59,8.59-22.56,0-31.14-4.29-4.29-9.93-6.44-15.57-6.44Z"/><circle cx="29.74" cy="36.11" r="5.78" fill="#fff"/><circle cx="29.74" cy="36.11" r="2.31" fill="#4a254b"/><circle cx="48.22" cy="36.11" r="5.78" fill="#fff"/><circle cx="48.22" cy="36.11" r="2.31" fill="#4a254b"/><path fill="#4a254b" d="m34.99,43.04c-.36,0-.63.33-.57.68.34,2.21,2.25,3.91,4.56,3.91s4.22-1.69,4.56-3.91c.06-.36-.21-.68-.57-.68h-7.98Z"/><path fill="#4a254b" d="m54,61.23c-.16,0-.32-.08-.41-.22-.16-.23-.1-.54.13-.7,1.28-.88,2.48-1.88,3.59-2.99,1.92-1.92,3.52-4.12,4.73-6.53.12-.25.43-.34.67-.22.25.12.35.42.22.67-1.26,2.5-2.92,4.79-4.92,6.79-1.15,1.15-2.4,2.19-3.73,3.11-.09.06-.19.09-.28.09Z"/><path fill="#4a254b" d="m51,63.01c-.18,0-.36-.1-.45-.27-.12-.25-.03-.55.22-.67,1.02-.51,2.01-1.1,2.94-1.74.23-.16.54-.1.7.13.16.23.1.54-.13.7-.98.67-2,1.28-3.06,1.81-.07.04-.15.05-.22.05Z"/></svg> --> ${post.data.title} </h1> </div> <p class="text-sm text-default"> <a itemprop="author"${addAttribute(authorURL, "href")} class="hover:text-secondary font-medium">${authorName}</a> </p><p class="text-xs text-muted"> <time${addAttribute(`${post.data.publishDate.toISOString()}`, "datetime")}>${date}</time> </p>  <!-- <TipRssSubscriber lang={lang} /> --> </div>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/SnippetTitle.astro", undefined);

const $$Astro$1 = createAstro("https://fatbobman.com");
const $$RandomTips = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RandomTips;
  const { lang, slug } = Astro2.props;
  const tips = await snippetOperator.getRandomSnippets(lang, slug, 4);
  const fontWide = lang === Lang.ZH ? "font-wide" : "";
  const relateText = lang === Lang.EN ? "Related Tips" : "\u76F8\u5173\u63D0\u793A";
  return renderTemplate`${tips.length > 0 && renderTemplate`${maybeRenderHead()}<section class="pt-2 pb-10" id="more-tips"><!-- Section 标题：与正文区分，增加层次感 --><div class="flex items-center gap-2 mb-6 justify-center text-gray-400 dark:text-gray-500"><span class="h-px w-8 bg-gray-200 dark:bg-gray-700"></span><span class="text-xs font-bold uppercase tracking-widest">${relateText}</span><span class="h-px w-8 bg-gray-200 dark:bg-gray-700"></span></div><!-- 网格布局：2列 (移动端 1列太长，直接 2列更紧凑) --><div class="grid grid-cols-1 md:grid-cols-2 gap-4">${tips.map((tip) => renderTemplate`<a${addAttribute(urlHelper.getTipPathBySlug(tip.slug), "href")}${addAttribute("relatedPosts-" + tip.data.title, "id")} class="
                group relative flex flex-col justify-center px-5 py-4 h-full
                bg-white dark:bg-gray-900/50 
                border border-gray-200 dark:border-gray-700/60 rounded-xl
                hover:border-orange-400/50 dark:hover:border-blue-500/50
                hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] dark:hover:shadow-none
                transition-all duration-300
              "><!-- 装饰：左上角的小点或图标，增加精致感 --><div class="absolute top-4 left-3 w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-orange-500 dark:group-hover:bg-blue-500 transition-colors"></div><div class="flex items-start justify-between gap-3 pl-2"><!-- 标题 --><span${addAttribute(`text-[15px] leading-relaxed font-medium text-gray-700 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors ${fontWide}`, "class")}><span class="hidden sm:inline-block text-xs mr-2 md:mr-1">${snippetOperator.getIconByTitle(tip.data.title)}</span>${tip.data.title}</span><!-- 箭头图标：Hover 时平移出现 --><svg class="w-4 h-4 text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg></div></a>`)}</div></section>`}`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/RandomTips.astro", undefined);

const $$Astro = createAstro("https://fatbobman.com");
const $$SnippetLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SnippetLayout;
  const { lang, baseCSS = undefined, pageCSS = "", post } = Astro2.props;
  const { Content, remarkPluginFrontmatter } = await post.render();
  const meta = await metaDataHelper.getMetaDataBySnippet(post);
  const commandID = post.slug.split("/").pop()?.substring(0, 49) ?? "";
  const jsonLD = jsonLdHelper.generateJsonLd(post, meta, lang);
  lang === Lang.ZH ? "tracking-wide" : "";
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "metadata": meta, "language": lang, "baseCSS": baseCSS, "pageCSS": pageCSS, "jsonLD": jsonLD }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "SnippetTitle", $$SnippetTitle, { "lang": lang, "post": post })} ${renderComponent($$result2, "CopyCodeSvg", $$CopyCodeSvg, {})} ${maybeRenderHead()}<div class="relative" id="article-area"> <!-- <WeeklyBottomNavigator lang={lang} issue={post.data.issue} /> --> <article class="prose dark:prose-invert mx-auto w-full prose-h2:font-semibold prose-h3:font-medium mb-16"> <div> ${renderComponent($$result2, "Content", Content, {})} </div> </article> ${renderComponent($$result2, "BottomCardAds", $$BottomCardAds, {})} ${renderComponent($$result2, "OpenInNewWindowJS", $$OpenInNewWindowJS, {})} ${renderComponent($$result2, "CopyCodeButtonJS", $$CopyCodeButtonJS, {})} ${renderComponent($$result2, "HeaderURLCopyerJS", $$HeaderURLCopyerJS, { "lang": lang })} ${renderComponent($$result2, "AdsLoader", $$AdsNewLoader, { "lang": lang })} ${renderComponent($$result2, "SideBar", $$SideBar, { "lang": lang, "post": post, "source": DataSourceType.TIP })} ${renderComponent($$result2, "RandomTips", $$RandomTips, { "lang": lang, "slug": post.slug })} ${renderComponent($$result2, "SubscriberAndBuyCoffee", $$SubscriberAndBuyCoffee, { "lang": lang })} <!-- <WeeklySubscribe lang={lang} top={0} bottom={4} anchor='more-tips'/> --> <!-- <Author lang={lang} /> --> ${renderComponent($$result2, "TOC", $$TOC, { "body": post.body, "source": DataSourceType.TIP })} </div> ${renderComponent($$result2, "Comment", $$Comment, { "commentID": commandID, "lang": lang, "source": DataSourceType.TIP, "anchor": "more-tips" })}  `, "footer": ($$result2) => renderTemplate`${renderComponent($$result2, "Footer", $$Footer, { "slot": "footer", "lang": lang })}`, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Header", $$Header, { "slot": "header", "lang": lang })}` })}`;
}, "/Users/yangxu/Astro/FatBlog/src/layouts/SnippetLayout.astro", undefined);

export { $$SnippetLayout as $ };
