import { e as createAstro, c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead, F as Fragment, f as addAttribute, g as renderSlot } from './astro/server_C0quZjbu.mjs';
import 'kleur/colors';
import { $ as $$PageLayout } from './PageLayout_C5hChsBd.mjs';
import { $ as $$Footer, a as $$Header } from './Footer_B4u8gcKS.mjs';
import { L as Lang, u as urlHelper } from './images_Ck81mHQe.mjs';
import { m as metaDataHelper } from './metaData_Cr-Y257r.mjs';
import { d as dataFormat } from './languages_C_U14EfB.mjs';
import { w as weeklyHelper } from './weekly_DbXVvKYs.mjs';

const $$Astro = createAstro("https://fatbobman.com");
const $$WeeklyArchiveLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$WeeklyArchiveLayout;
  const { lang } = Astro2.props;
  const weeklys = await weeklyHelper.getWeeklyList(lang);
  const metadata = await metaDataHelper.getMetaDataByWeeklyList(lang);
  const pageCSS = "";
  const h1Title = lang === Lang.ZH ? "\u5468\u520A\u5217\u8868" : "Weekly List";
  const fontWide = lang === Lang.ZH ? "tracking-wide" : "";
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "metadata": metadata, "language": lang, "baseCSS": ("") + " bg-page", "pageCSS": pageCSS }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<h1 class="sr-only">${h1Title}</h1> <ol class="relative border-s border-gray-200 dark:border-gray-700 mt-8 mb-32"> ${weeklys.map((weekly, index) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <li class="hover:cursor-pointer group"> <div class="mx-1 px-3 py-4 group-hover:sm:bg-block rounded-lg sm:hover:shadow-sm"> <a${addAttribute(urlHelper.extractPostNameFromSlug(weekly.slug) + "/", "href")}> <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700 group-hover:bg-secondary group-hover:dark:bg-white"></div> <h3${addAttribute(`group-hover:text-secondary group-hover:dark:text-white text-lg sm:text-xl font-semibold text-heading ${fontWide}`, "class")}># ${weekly.data.issue} - ${weekly.data.subtitle}</h3> <div class="mt-2 text-xxs font-medium leading-none text-secondary">${dataFormat(weekly.data.publishDate.toISOString(), lang)}</div> <div${addAttribute(`mt-4 text-sm leading-loose line-clamp-2 group-hover:sm:text-heading text-muted dark:text-gray-400/90 ${fontWide}`, "class")}>${weekly.data.description}</div> </a> </div> </li> ${index < weeklys.length - 1 && renderTemplate`<div class="py-2 w-5/6 mx-auto"> <hr class="border-0 border-b border-dashed border-gray-300 dark:border-gray-400/20"> </div>`}` })}`)} </ol> ${renderSlot($$result2, $$slots["default"])}  `, "footer": ($$result2) => renderTemplate`${renderComponent($$result2, "Footer", $$Footer, { "slot": "footer", "lang": lang })}`, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Header", $$Header, { "slot": "header", "lang": lang })}` })}`;
}, "/Users/yangxu/Astro/FatBlog/src/layouts/WeeklyArchiveLayout.astro", undefined);

export { $$WeeklyArchiveLayout as $ };
