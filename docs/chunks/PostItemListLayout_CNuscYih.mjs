import { e as createAstro, c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead, f as addAttribute, F as Fragment, g as renderSlot } from './astro/server_C0quZjbu.mjs';
import 'kleur/colors';
import { L as Lang, P as PostDescriptionType, u as urlHelper, b as PostVisibility } from './images_Ck81mHQe.mjs';
import { d as dataOperator } from './metaData_Cr-Y257r.mjs';
import { $ as $$ListLayout } from './ListLayout_CxutuOsE.mjs';
import { d as dataFormat } from './languages_C_U14EfB.mjs';

const $$Astro$1 = createAstro("https://fatbobman.com");
const $$PostItemList = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$PostItemList;
  const { lang, postList, postDescriptionType } = Astro2.props;
  const count = lang === Lang.ZH ? 150 : 200;
  const fontWide = lang === Lang.ZH ? "tracking-wide" : "";
  return renderTemplate`${postList.map((postItem) => {
    let desciption = undefined;
    if (postDescriptionType === PostDescriptionType.FULL) {
      desciption = postItem.post.data.descriptionForSeo || postItem.post.data.description;
    } else if (postDescriptionType === PostDescriptionType.SHORT) {
      desciption = postItem.post.data.descriptionForSeo || postItem.post.data.description;
      if (desciption && desciption.length > count) {
        desciption = `${desciption.slice(0, count)}...`;
      }
    } else {
      desciption = undefined;
    }
    return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="relative group cursor-pointer hover:sm:bg-block sm:px-4 sm:py-6 rounded-lg sm:hover:shadow-sm "><a${addAttribute(urlHelper.getPostPathBySlug(postItem.post.slug), "href")} class="absolute inset-0 z-0" aria-hidden="true"></a><div class="relative z-10 flex flex-col pointer-events-none"><h3${addAttribute(`font-semibold sm:font-bold sm:text-xl text-heading scroll-mt-4 sm:scroll-mt-20 group-hover:text-secondary group-hover:dark:text-white ${fontWide}`, "class")}${addAttribute(postItem.id ? postItem.id : undefined, "id")}>${postItem.post.data.title}</h3><div class="flex justify-start items-center space-x-2 mt-2"><span class="text-xxs text-muted font-semibold">${dataFormat(postItem.post.data.publishDate.toISOString(), lang)}</span>${postItem.post.data.tags && postItem.post.data.tags.map((tag) => renderTemplate`<a class="pointer-events-auto text-xxs font-semibold mx-2 text-secondary hover:text-heading cursor-pointer"${addAttribute(urlHelper.getTagPathByLangAndTag(lang, tag), "href")}>
#${tag}</a>`)}</div>${postItem.post.data.author && renderTemplate`<p class="mt-2 font-light text-sm">by <span class="font-medium italic">${postItem.post.data.author}</span></p>`}${desciption && renderTemplate`<span${addAttribute(`mt-5 text-muted dark:text-gray-400/90 text-sm hidden sm:block leading-loose line-clamp-2 group-hover:sm:text-heading ${fontWide}`, "class")}>${dataOperator.chineseDescription(desciption, lang)}</span>`}</div></div><div class=" w-5/6 mx-auto"><hr class="border-0 border-b border-dashed border-gray-300 dark:border-gray-400/20"></div>` })}`;
  })}`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/PostItemList.astro", undefined);

const $$Astro = createAstro("https://fatbobman.com");
const $$PostItemListLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PostItemListLayout;
  const {
    lang,
    yearList,
    postList,
    postDescriptionType,
    metadata,
    title,
    listType,
    showList = true,
    metadescription = null,
    showH1 = true
  } = Astro2.props;
  await dataOperator.fetchFilteredPosts(lang, PostVisibility.LIST_VISIBLE);
  const h1Title = lang === Lang.ZH ? "\u5168\u90E8\u6587\u7AE0" : "All Posts";
  let newMetadata = metadata;
  if (metadescription) {
    newMetadata = { ...metadata, description: metadescription };
  }
  return renderTemplate`${renderComponent($$result, "ListLayout", $$ListLayout, { "metadata": newMetadata, "lang": lang, "listType": listType }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["tags"])} ${showH1 && renderTemplate`${maybeRenderHead()}<h1 class="sr-only">${h1Title}</h1>`}${showList && // <section class="text-default bg-page">
  //   <div class="container max-w-5xl sm:px-0 pt-2 pb-12 mx-auto">
  //     <div class="grid sm:grid-cols-12">
  //       {/* 滚动时留在原地 top-100px */}
  //       <div class="col-span-12 sm:col-span-3 hidden sm:block">
  //         <div class="text-center sm:text-left mt-3 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-secondary sticky top-[120px]">
  //           <YearList yearList={yearList} title={title} />
  //         </div>
  //       </div>
  //       <div class="relative col-span-12 px-0 space-y-6 sm:col-span-9">
  //         <div class="col-span-12 space-y-3 relative px-0 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-block">
  //           <PostItemList lang={lang} postList={postList} postDescriptionType={postDescriptionType} />
  //         </div>
  //         {/* 占位空间，保证左侧年份不受 footer 的影响，最后改变位置 */}
  //         <div class="h-[100px]" />
  //       </div>
  //     </div>
  //   </div>
  // </section>
  renderTemplate`<section class="text-default bg-page"> <div class="container max-w-5xl sm:px-0 pt-2 pb-12 mx-auto"> <div class="relative col-span-12 px-0 space-y-6 sm:col-span-9"> <div class="col-span-12 space-y-3 relative px-0 sm:col-span-8 sm:space-y-2"> ${renderComponent($$result2, "PostItemList", $$PostItemList, { "lang": lang, "postList": postList, "postDescriptionType": postDescriptionType })} </div> </div> </div> </section>`}` })}`;
}, "/Users/yangxu/Astro/FatBlog/src/layouts/PostItemListLayout.astro", undefined);

export { $$PostItemListLayout as $ };
