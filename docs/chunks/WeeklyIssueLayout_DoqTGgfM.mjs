import { e as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, u as unescapeHTML, a as renderComponent } from './astro/server_C0quZjbu.mjs';
import 'kleur/colors';
import { $ as $$PageLayout } from './PageLayout_C5hChsBd.mjs';
import { L as Lang, D as DataSourceType } from './images_Ck81mHQe.mjs';
import { m as metaDataHelper } from './metaData_Cr-Y257r.mjs';
import { $ as $$Footer, a as $$Header } from './Footer_B4u8gcKS.mjs';
import 'clsx';
import { d as dataFormat } from './languages_C_U14EfB.mjs';
import { w as weeklyHelper } from './weekly_DbXVvKYs.mjs';
import { $ as $$CopyCodeSvg, a as $$BottomCardAds, b as $$CopyCodeButtonJS, d as $$TOC, e as $$SideBar, c as $$Comment } from './BottomCardAds_fyfoxq7y.mjs';
import { $ as $$HeaderURLCopyerJS } from './HeaderURLCopyerJS_CW82WLfD.mjs';
import { $ as $$OpenInNewWindowJS } from './OpenInNewWindowJS_DLHSaa6l.mjs';
import { $ as $$AdsNewLoader } from './AdsNewLoader_CevgxE9A.mjs';
import { j as jsonLdHelper } from './BaseLayout_CWMQKIS_.mjs';
import { $ as $$SubscriberAndBuyCoffee } from './SubscriberAndBuyCoffee_BCJ5jjve.mjs';
/* empty css                          */

const $$Astro$2 = createAstro("https://fatbobman.com");
const $$WeeklyTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$WeeklyTitle;
  const { lang, post } = Astro2.props;
  const date = dataFormat(post.data.publishDate.toISOString(), lang);
  lang === Lang.ZH ? "\u4E1C\u5761\u8098\u5B50" : "Fatbobman";
  const publishText = lang === Lang.ZH ? "\u53D1\u8868\u4E8E " : "Published on ";
  const otherLang = lang === Lang.ZH ? "#English" : "#\u4E2D\u6587\u7248";
  const otherLangURL = weeklyHelper.getOtherLanguageRelateW(lang, post.slug);
  const imageURL = "https://cdn.fatbobman.com/weekly/issue" + post.data.issue + ".webp";
  return renderTemplate`${maybeRenderHead()}<div class="mx-auto space-y-4 text-center pt-10 pb-6"> <div class="flex mx-auto justify-center"> <a class="text-xs font-medium sm:font-semibold mx-2 text-muted hover:text-secondary"${addAttribute(otherLangURL, "href")} id="language-switcher-for-topic"> ${otherLang} </a> </div> <div class="flex mx-auto justify-center" style="width:80%;"> <h1 class="text-2xl font-bold leadi md:text-3xl text-heading"># ${post.data.issue} - ${post.data.subtitle}</h1> </div> <p class="text-xs text-muted pt-0 sm:pt-4"> ${publishText}<time${addAttribute(`${post.data.publishDate.toISOString()}`, "datetime")}>${date}</time> </p> <div class="space-y-2 pt-2 sm:pt-4"> <picture class="critical-content object-cover w-full"> <!-- 为不同屏幕尺寸提供响应式图片 --> <source media="(max-width: 479px)"${addAttribute(imageURL + "?imageView2/0/w/300 1x, " + imageURL + "?imageView2/0/w/400 2x", "srcset")}> <source media="(max-width: 767px)"${addAttribute(imageURL + "?imageView2/0/w/400 1x, " + imageURL + "?imageView2/0/w/600 2x", "srcset")}> <source media="(max-width: 1024px)"${addAttribute(imageURL + "?imageView2/0/w/600 1x, " + imageURL + "?imageView2/0/w/700 2x", "srcset")}> <!-- 默认图片，适配更大的屏幕 --> <img${addAttribute(imageURL + "?imageView2/1/w/1600", "src")} alt="Article Image" class="critical-image object-cover w-full rounded-lg shadow-sm" decoding="async" fetchpriority="high" width="1600" height="900"> </picture> ${post.data.imageAuthor && renderTemplate`<p class="text-muted text-xs text-center">${unescapeHTML(post.data.imageAuthor)}</p>`} </div> </div>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/WeeklyTitle.astro", undefined);

const $$Astro$1 = createAstro("https://fatbobman.com");
const $$WeeklyBottomNavigator = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$WeeklyBottomNavigator;
  const { lang, issue } = Astro2.props;
  const relatedWeeklys = weeklyHelper.getRecentWeekly(lang, issue, 7).filter((weekly) => !weekly.currentIssue).slice(0, 4);
  const fontWide = lang === Lang.ZH ? "font-wide" : "";
  const relateText = lang === Lang.EN ? "Related Weekly" : "\u76F8\u5173\u5468\u62A5";
  return renderTemplate`${relatedWeeklys.length > 0 && renderTemplate`${maybeRenderHead()}<section class="pt-4 pb-10  " id="weekly-bottom-navigator"><!-- Section 标题：与正文区分，增加层次感 --><div class="flex items-center gap-2 mb-6 justify-center text-gray-400 dark:text-gray-500"><span class="h-px w-8 bg-gray-200 dark:bg-gray-700"></span><span class="text-xs font-bold uppercase tracking-widest">${relateText}</span><span class="h-px w-8 bg-gray-200 dark:bg-gray-700"></span></div><!-- 网格布局：2列 (移动端 1列太长，直接 2列更紧凑) --><div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="more-tips">${relatedWeeklys.map((weekly) => renderTemplate`<a${addAttribute(weekly.url, "href")}${addAttribute("relatedPosts-" + weekly.title, "id")} class="
                group relative flex flex-col justify-center px-5 py-4 h-full
                bg-white dark:bg-gray-900/50 
                border border-gray-200 dark:border-gray-700/60 rounded-xl
                hover:border-orange-400/50 dark:hover:border-blue-500/50
                hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] dark:hover:shadow-none
                transition-all duration-300
              "><!-- 装饰：左上角的小点或图标，增加精致感 --><div class="absolute top-4 left-3 w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-orange-500 dark:group-hover:bg-blue-500 transition-colors"></div><div class="flex items-start justify-between gap-3 pl-2"><!-- 标题 --><span${addAttribute(`text-[15px] leading-relaxed font-medium text-gray-700 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white transition-colors ${fontWide}`, "class")}><span class="mr-1">#${weekly.weeklyIssue}</span>${weekly.title}</span><!-- 箭头图标：Hover 时平移出现 --><svg class="w-4 h-4 text-gray-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg></div></a>`)}</div></section>`}`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/WeeklyBottomNavigator.astro", undefined);

const $$Astro = createAstro("https://fatbobman.com");
const $$WeeklyIssueLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$WeeklyIssueLayout;
  const { lang, baseCSS = undefined, pageCSS = "", post } = Astro2.props;
  const { Content, remarkPluginFrontmatter } = await post.render();
  const meta = await metaDataHelper.getMetaDatabyWeekly(post);
  const commentID = "weekly - issue " + post.data.issue;
  const jsonLD = jsonLdHelper.generateJsonLd(post, meta, lang);
  const h3Size = lang === Lang.ZH ? "prose prose-h2:inline-flex dark:prose-invert mx-auto w-full mb-16 prose-h3:mb-8  prose-h3:text-lg prose-h2:font-medium dark:prose-h2:text-white/90 prose-h2:text-white dark:prose-h2:bg-blue-700/80 prose-h2:bg-orange-600/80 prose-h2:text-base prose-h2:px-4 prose-h2:py-1 prose-h2:rounded-lg  prose-headings:tracking-wide prose-p:tracking-wide prose-a:tracking-wide>" : "prose prose-h2:inline-flex dark:prose-invert mx-auto w-full mb-16 prose-h3:mb-8  prose-h3:text-xl prose-h2:font-bold dark:prose-h2:text-white/90 prose-h2:text-white dark:prose-h2:bg-blue-700/80 prose-h2:bg-orange-600/80 prose-h2:text-base prose-h2:px-4 prose-h2:py-1 prose-h2:rounded-lg >";
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "metadata": meta, "language": lang, "baseCSS": baseCSS, "pageCSS": pageCSS, "jsonLD": jsonLD, "data-astro-cid-klpvivtk": true }, { "default": ($$result2) => renderTemplate`   ${renderComponent($$result2, "WeeklyTitle", $$WeeklyTitle, { "lang": lang, "post": post, "data-astro-cid-klpvivtk": true })} ${renderComponent($$result2, "CopyCodeSvg", $$CopyCodeSvg, { "data-astro-cid-klpvivtk": true })} ${maybeRenderHead()}<div class="relative" id="article-area" data-astro-cid-klpvivtk> <!-- <WeeklyBottomNavigator lang={lang} issue={post.data.issue} /> --> <article${addAttribute(h3Size, "class")} data-astro-cid-klpvivtk> <div data-astro-cid-klpvivtk> <aside aria-label="advertisement" role="complementary" data-astro-cid-klpvivtk><div class="dynamic-ad-inline" data-astro-cid-klpvivtk></div></aside> <!-- <AdsBannerTest /> --> ${renderComponent($$result2, "Content", Content, { "data-astro-cid-klpvivtk": true })} </div> <!-- <BuymeacoffeeInPost lang={lang} /> --> </article> ${renderComponent($$result2, "BottomCardAds", $$BottomCardAds, { "data-astro-cid-klpvivtk": true })} ${renderComponent($$result2, "HeaderURLCopyerJS", $$HeaderURLCopyerJS, { "lang": lang, "data-astro-cid-klpvivtk": true })} ${renderComponent($$result2, "CopyCodeButtonJS", $$CopyCodeButtonJS, { "data-astro-cid-klpvivtk": true })} ${renderComponent($$result2, "OpenInNewWindowJS", $$OpenInNewWindowJS, { "data-astro-cid-klpvivtk": true })} ${renderComponent($$result2, "AdsLoader", $$AdsNewLoader, { "lang": lang, "data-astro-cid-klpvivtk": true })} ${renderComponent($$result2, "WeeklyBottomNavigator", $$WeeklyBottomNavigator, { "lang": lang, "issue": post.data.issue, "data-astro-cid-klpvivtk": true })} ${renderComponent($$result2, "SubscriberAndBuyCoffee", $$SubscriberAndBuyCoffee, { "lang": lang, "data-astro-cid-klpvivtk": true })} <!-- <LeaveFeedback lang={lang} /> --> <!-- <BottomWeeklySubscribe lang={lang} /> --> <!-- <WeeklySubscribe lang={lang} top={0} bottom={4} anchor='weekly-bottom-navigator'/> --> <!-- <Author lang={lang} /> --> <!-- <RelatedWeeklys lang={lang} currentIssue={post.data.issue} /> --> ${renderComponent($$result2, "TOC", $$TOC, { "body": post.body, "source": DataSourceType.WEEKLY, "data-astro-cid-klpvivtk": true })} ${renderComponent($$result2, "SideBar", $$SideBar, { "lang": lang, "post": post, "source": DataSourceType.WEEKLY, "data-astro-cid-klpvivtk": true })} ${renderComponent($$result2, "Comment", $$Comment, { "lang": lang, "commentID": commentID, "source": DataSourceType.WEEKLY, "anchor": "weekly-bottom-navigator", "data-astro-cid-klpvivtk": true })} </div>  `, "footer": ($$result2) => renderTemplate`${renderComponent($$result2, "Footer", $$Footer, { "slot": "footer", "lang": lang, "data-astro-cid-klpvivtk": true })}`, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Header", $$Header, { "slot": "header", "lang": lang, "data-astro-cid-klpvivtk": true })}` })}`;
}, "/Users/yangxu/Astro/FatBlog/src/layouts/WeeklyIssueLayout.astro", undefined);

export { $$WeeklyIssueLayout as $ };
