import { e as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, f as addAttribute, a as renderComponent, g as renderSlot } from './astro/server_C0quZjbu.mjs';
import 'kleur/colors';
import { $ as $$PageLayout } from './PageLayout_C5hChsBd.mjs';
import { $ as $$Footer, a as $$Header } from './Footer_B4u8gcKS.mjs';
import 'clsx';
import { u as urlHelper, a as ListType, L as Lang, U as URLType } from './images_Ck81mHQe.mjs';
import { d as dataOperator } from './metaData_Cr-Y257r.mjs';
import { l as languageHelper } from './languages_C_U14EfB.mjs';

class ListHelper {
  dataOperator;
  langHelper = languageHelper;
  urlHelper = urlHelper;
  constructor(dataOperator2) {
    this.dataOperator = dataOperator2;
  }
  // 返回 listtype 类型的列表
  getListTypes() {
    const enumValues = Object.values(ListType);
    return enumValues;
  }
  // 给定的 post 数组（ [CollectionEntry<'blog'>] ）返回 postItemInList 数组，保持原有顺序
  // postItemInList 数组包含 post 和 id 两个属性
  // 对 post 按照年份进行分组，只有某个年份的第一篇文章的 id 才会被设置为 year，其他的 id 为 undifined。
  // 例如：输入 [post1, post2, post3, post4]，其中 post1 和 post2 的年份相同，都为 2023,post1 早于 post2,pos1 的id 为 2023，post2 的id 为 undifiend
  // 输出 [{post: post1, id: 2023}, {post: post2, id: undefined}, {post: post3, id: 2024}, {post: post4, id: undefined}]
  getPostItemInListByPosts(posts) {
    const postItemInList = [];
    let index = 0;
    for (const post of posts) {
      const year = new Date(post.data.publishDate).getFullYear();
      const lastPostItemInList = postItemInList[postItemInList.length - 1];
      if (lastPostItemInList && lastPostItemInList.id === String(year)) {
        postItemInList.push({ post, id: undefined });
      } else {
        if (index === 6) {
          postItemInList.push({ post, id: "more-artical-start" });
        } else {
          postItemInList.push({ post, id: String(year) });
        }
      }
      index++;
    }
    return postItemInList;
  }
  // 根据给定的 post 数组，返回 YearItem 数组
  // 例如：输入 [post1, post2, post3, post4]，post1,post2 为 2023 ，post3 为 2021，post4 为 2020，返回 [{year: 2023, id: 2023}, {year: 2021, id: 2021}, {year: 2020, id: 2020}]
  getYearItemByPosts(posts) {
    const yearItem = [];
    for (const post of posts) {
      const year = new Date(post.data.publishDate).getFullYear();
      const lastYearItem = yearItem[yearItem.length - 1];
      if (lastYearItem && lastYearItem.year === year) {
        continue;
      } else {
        yearItem.push({ year, id: String(year) });
      }
    }
    return yearItem;
  }
  async getPostListByTag(lang, tag) {
    if (tag) {
      const posts = await dataOperator.getPostsByTag(lang, tag);
      return listHelper.getPostItemInListByPosts(posts);
    } else {
      return [];
    }
  }
  async getYearListByTag(lang, tag) {
    if (tag) {
      const posts = await dataOperator.getPostsByTag(lang, tag);
      return listHelper.getYearItemByPosts(posts);
    } else {
      return [];
    }
  }
}
const listHelper = new ListHelper(dataOperator);

const $$Astro$1 = createAstro("https://fatbobman.com");
const $$ListTab = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ListTab;
  const { lang, listType } = Astro2.props;
  const tabs = listHelper.getListTypes();
  const t = languageHelper.buildTranslationForLang(lang);
  const fontWide = lang === Lang.ZH ? "tracking-wide" : "";
  function getTabUrl(tab) {
    switch (tab) {
      case ListType.ARCHIVE:
        return urlHelper.getPathByLangAndUrlType(lang, URLType.POSTS, false);
      case ListType.COLLECTION:
        return urlHelper.getPathByLangAndUrlType(lang, URLType.COLLECTIONS, false);
      case ListType.TAG:
        return urlHelper.getPathByLangAndUrlType(lang, URLType.TAGS, false);
    }
  }
  return renderTemplate`${maybeRenderHead()}<div class="flex items-center -mx-4 space-x-2 overflow-x-auto overflow-y-hidden justify-center flex-nowrap font-sans font-medium"> ${tabs.map((tab) => renderTemplate`<a rel="noopener noreferrer"${addAttribute(getTabUrl(tab), "href")}${addAttribute(`flex items-center flex-shrink-0 px-5 py-2 border-b-4 ${listType === tab ? `border-secondary text-secondary ${fontWide}` : ` border-gray-400 dark:border-default text-muted dark:text-default hover:text-secondary hover:border-secondary dark:hover:text-secondary dark:hover:border-secondary ${fontWide}`}`, "class")}> ${t(`listType.${tab}`)} </a>`)} </div>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/ListTab.astro", undefined);

const $$Astro = createAstro("https://fatbobman.com");
const $$ListLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ListLayout;
  const { metadata, lang, listType, baseCSS = "", pageCSS = "" } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "metadata": metadata, "language": lang, "baseCSS": (baseCSS || "") + " bg-page", "pageCSS": pageCSS }, { "default": ($$result2) => renderTemplate`  ${renderComponent($$result2, "ListTab", $$ListTab, { "lang": lang, "listType": listType })} ${renderSlot($$result2, $$slots["default"])}  `, "footer": ($$result2) => renderTemplate`${renderComponent($$result2, "Footer", $$Footer, { "slot": "footer", "lang": lang })}`, "header": ($$result2) => renderTemplate`${renderComponent($$result2, "Header", $$Header, { "slot": "header", "lang": lang })}` })}`;
}, "/Users/yangxu/Astro/FatBlog/src/layouts/ListLayout.astro", undefined);

export { $$ListLayout as $, listHelper as l };
