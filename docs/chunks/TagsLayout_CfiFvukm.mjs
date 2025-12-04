import { e as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, a as renderComponent } from './astro/server_C0quZjbu.mjs';
import 'kleur/colors';
import { $ as $$PostItemListLayout } from './PostItemListLayout_CNuscYih.mjs';
import { L as Lang, u as urlHelper, a as ListType, U as URLType, P as PostDescriptionType } from './images_Ck81mHQe.mjs';
import { l as listHelper } from './ListLayout_CxutuOsE.mjs';
import { d as dataOperator, m as metaDataHelper } from './metaData_Cr-Y257r.mjs';
import 'clsx';

const $$Astro$1 = createAstro("https://fatbobman.com");
const $$TagsCollection = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TagsCollection;
  const { lang, currentTag = undefined } = Astro2.props;
  const tagName = currentTag || (lang === Lang.EN ? "All Tags" : "\u5168\u90E8\u6807\u7B7E");
  let tags = await dataOperator.getTagsbyLang(lang);
  return renderTemplate`${maybeRenderHead()}<h1 class="sr-only">${tagName}</h1> <div class="mx-auto space-y-2 flex-wrap align-middle text-center px-10"> ${tags.map((tag) => renderTemplate`<a${addAttribute(urlHelper.getTagPathByLangAndTag(lang, tag.name), "href")}${addAttribute(`px-3 inline-block text-sm font-semibold ${tagName.toLowerCase() === tag.name.toLowerCase() ? "bg-buttonBg text-white rounded-md" : "text-muted dark:text-default hover:text-secondary dark:hover:text-secondary"}`, "class")}>
#${tag.name} </a>`)} </div>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/TagsCollection.astro", undefined);

const $$Astro = createAstro("https://fatbobman.com");
const $$TagsLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TagsLayout;
  const { lang, tag, metadescription = null } = Astro2.props;
  const listType = ListType.TAG;
  const metadata = tag !== undefined ? await metaDataHelper.getMetaDataByTag(lang, tag) : await metaDataHelper.getMetaDataByLangAndUrlType(lang, URLType.TAGS);
  const showList = tag !== undefined ? true : false;
  const postList = await listHelper.getPostListByTag(lang, tag);
  const yearList = await listHelper.getYearListByTag(lang, tag);
  const postDescriptionType = PostDescriptionType.FULL;
  const defaultTitle = lang === Lang.ZH ? "\u6807\u7B7E" : "Tags";
  const title = tag ? tag : defaultTitle;
  return renderTemplate`${renderComponent($$result, "PostItemListLayout", $$PostItemListLayout, { "lang": lang, "postList": postList, "yearList": yearList, "postDescriptionType": postDescriptionType, "title": title, "metadata": metadata, "listType": listType, "showList": showList, "metadescription": metadescription, "showH1": false }, { "tags": ($$result2) => renderTemplate`${renderComponent($$result2, "TagsCollection", $$TagsCollection, { "lang": lang, "slot": "tags", "currentTag": tag })}` })}`;
}, "/Users/yangxu/Astro/FatBlog/src/layouts/TagsLayout.astro", undefined);

export { $$TagsLayout as $ };
