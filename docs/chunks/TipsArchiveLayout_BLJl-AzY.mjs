import { e as createAstro, c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead, f as addAttribute, g as renderSlot } from './astro/server_C0quZjbu.mjs';
import 'kleur/colors';
import { $ as $$PageLayout } from './PageLayout_C5hChsBd.mjs';
import { $ as $$Footer, a as $$Header } from './Footer_B4u8gcKS.mjs';
import { b as PostVisibility, L as Lang, u as urlHelper } from './images_Ck81mHQe.mjs';
import { s as snippetOperator } from './snippets_C28dQPqY.mjs';
import { m as metaDataHelper } from './metaData_Cr-Y257r.mjs';

const $$Astro = createAstro("https://fatbobman.com");
const $$TipsArchiveLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TipsArchiveLayout;
  const { lang } = Astro2.props;
  const metadata = await metaDataHelper.getMetaDataByTipsList(lang);
  const tips = await snippetOperator.fetchFilteredSnippets(lang, PostVisibility.LIST_VISIBLE);
  const pageCSS = "";
  const hiTitle = lang === Lang.ZH ? "\u5C0F\u8D34\u58EB\u5217\u8868" : "Tips List";
  const fontWide = lang === Lang.ZH ? "tracking-wide" : "";
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "metadata": metadata, "language": lang, "baseCSS": ("") + " bg-page", "pageCSS": pageCSS }, { "default": ($$result2) => renderTemplate`   ${maybeRenderHead()}<h1 class="sr-only">${hiTitle}</h1> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-4 pb-16"> ${tips.map((tip) => renderTemplate`<a class="rounded-md py-3 px-4 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
          hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600 flex items-stretch gap-2"${addAttribute(urlHelper.extractPostNameFromSlug(tip.slug) + "/", "href")}>  <span${addAttribute(`font-semibold text-sm text-heading ${fontWide}`, "class")}> <span class="hidden sm:inline-block text-xs mr-2 md:mr-1">${snippetOperator.getIconByTitle(tip.data.title)}</span> ${tip.data.title} </span> </a>`)} </div> ${renderSlot($$result2, $$slots["default"])}  `, "footer": ($$result2) => renderTemplate`${renderComponent($$result2, "Footer", $$Footer, { "slot": "footer", "lang": lang })}`, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Header", $$Header, { "slot": "header", "lang": lang })}` })}`;
}, "/Users/yangxu/Astro/FatBlog/src/layouts/TipsArchiveLayout.astro", undefined);

export { $$TipsArchiveLayout as $ };
