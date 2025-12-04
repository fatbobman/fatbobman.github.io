import { e as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, a as renderComponent } from './astro/server_C0quZjbu.mjs';
import 'kleur/colors';
import { L as Lang, u as urlHelper, U as URLType, a as ListType } from './images_Ck81mHQe.mjs';
import { m as metaDataHelper, d as dataOperator } from './metaData_Cr-Y257r.mjs';
import { $ as $$ListLayout } from './ListLayout_CxutuOsE.mjs';
import 'clsx';

const $$Astro$1 = createAstro("https://fatbobman.com");
const $$CollectionItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CollectionItem;
  const { lang, collection } = Astro2.props;
  const fontWide = lang === Lang.ZH ? "tracking-wide" : "";
  const titleFontWide = lang === Lang.ZH ? "tracking-widest" : "";
  return renderTemplate`${maybeRenderHead()}<div class="bg-block text-default rounded overflow-clip md:hover:shadow-lg md:hover:scale-105 md:transition-transform md:duration-200 group cursor-pointer"> <a${addAttribute(urlHelper.getCollectionPathBySlugAndLang(collection.slug, lang), "href")}> <div class="container grid grid-cols-12 mx-auto"> <div class="hidden md:block md:col-span-4"> <img${addAttribute(collection.data.image + "?imageView2/1/w/400", "src")}${addAttribute(collection.slug, "alt")} class="object-cover w-full h-full"> </div> <div class="flex flex-col p-6 col-span-full md:col-span-8 lg:p-10"> <div class="flex justify-start"> <span class="py-1 text-xs font-medium text-secondary">${collection.data.subtitle}</span> </div> <h2${addAttribute(`text-xl font-semibold text-heading group-hover:text-secondary md:group-hover:text-heading ${titleFontWide}`, "class")}> ${collection.data.title} </h2> <p${addAttribute(`flex-1 pt-2 text-sm leading-relaxed ${fontWide} text-muted dark:text-gray-400/90`, "class")}>${collection.data.description}</p> </div> </div> </a> </div>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/CollectionItem.astro", undefined);

const $$Astro = createAstro("https://fatbobman.com");
const $$CollectionListLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CollectionListLayout;
  const { lang } = Astro2.props;
  const metadata = await metaDataHelper.getMetaDataByLangAndUrlType(lang, URLType.COLLECTIONS);
  const collections = await dataOperator.fetchCollectionsByLang(lang);
  const title = lang === Lang.ZH ? "\u6587\u7AE0\u5408\u96C6" : "Collections";
  return renderTemplate`${renderComponent($$result, "ListLayout", $$ListLayout, { "metadata": metadata, "lang": lang, "listType": ListType.COLLECTION }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="sr-only">${title}</h1> <div class="space-y-5 pb-10"> ${collections.map((collection) => renderTemplate`${renderComponent($$result2, "CollectionItem", $$CollectionItem, { "collection": collection, "lang": lang })}`)} </div> ` })}`;
}, "/Users/yangxu/Astro/FatBlog/src/layouts/CollectionListLayout.astro", undefined);

export { $$CollectionListLayout as $ };
