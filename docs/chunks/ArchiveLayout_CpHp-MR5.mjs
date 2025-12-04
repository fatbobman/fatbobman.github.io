import { e as createAstro, c as createComponent, r as renderTemplate, a as renderComponent } from './astro/server_C0quZjbu.mjs';
import 'kleur/colors';
import { $ as $$PostItemListLayout } from './PostItemListLayout_CNuscYih.mjs';
import { b as PostVisibility, L as Lang, U as URLType, a as ListType } from './images_Ck81mHQe.mjs';
import { d as dataOperator, m as metaDataHelper } from './metaData_Cr-Y257r.mjs';
import { l as listHelper } from './ListLayout_CxutuOsE.mjs';

const $$Astro = createAstro("https://fatbobman.com");
const $$ArchiveLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ArchiveLayout;
  const { lang, postDescriptionType } = Astro2.props;
  const posts = await dataOperator.fetchFilteredPosts(lang, PostVisibility.LIST_VISIBLE);
  const postList = listHelper.getPostItemInListByPosts(posts);
  const yearList = listHelper.getYearItemByPosts(posts);
  const title = lang === Lang.ZH ? "\u5168\u90E8\u6587\u7AE0" : "All Posts";
  const metadata = await metaDataHelper.getMetaDataByLangAndUrlType(lang, URLType.POSTS);
  const listType = ListType.ARCHIVE;
  return renderTemplate`${renderComponent($$result, "PostItemListLayout", $$PostItemListLayout, { "lang": lang, "postList": postList, "yearList": yearList, "postDescriptionType": postDescriptionType, "title": title, "metadata": metadata, "listType": listType, "showList": true })}`;
}, "/Users/yangxu/Astro/FatBlog/src/layouts/ArchiveLayout.astro", undefined);

export { $$ArchiveLayout as $ };
