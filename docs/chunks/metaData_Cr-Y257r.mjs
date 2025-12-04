import { l as languageHelper } from './languages_C_U14EfB.mjs';
import { V as VALID_INPUT_FORMATS, L as Lang, u as urlHelper, g as globalConfig, b as PostVisibility, f as findImage, U as URLType } from './images_Ck81mHQe.mjs';
import { Traverse } from 'neotraverse/modern';
import pLimit from 'p-limit';
import { z, ZodIssueCode } from 'zod';
import { removeBase, isRemotePath, prependForwardSlash } from '@astrojs/internal-helpers/path';
import { k as AstroError, R as RenderUndefinedEntryError, c as createComponent, r as renderTemplate, u as unescapeHTML, w as UnknownContentCollectionError, x as renderUniqueStylesheet, y as renderScriptElement, z as createHeadAndContent, a as renderComponent } from './astro/server_C0quZjbu.mjs';
import 'kleur/colors';
import * as devalue from 'devalue';

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('./_astro_data-layer-content_C1Jbl3_a.mjs');
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = undefined;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://fatbobman.com", "SSR": true};
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection
}) {
  return async function getCollection(collection, filter) {
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('./content-assets_DleWbedO.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (entry.legacyId) {
          entry = emulateLegacyEntry(entry);
        }
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
function emulateLegacyEntry({ legacyId, ...entry }) {
  const legacyEntry = {
    ...entry,
    id: legacyId,
    slug: entry.id
  };
  return {
    ...legacyEntry,
    // Define separately so the render function isn't included in the object passed to `renderEntry()`
    render: () => renderEntry(legacyEntry)
  };
}
const CONTENT_LAYER_IMAGE_REGEX = /__ASTRO_IMAGE_="([^"]+)"/g;
async function updateImageReferencesInBody(html, fileName) {
  const { default: imageAssetMap } = await import('./content-assets_DleWbedO.mjs');
  const imageObjects = /* @__PURE__ */ new Map();
  const { getImage } = await import('./images_Ck81mHQe.mjs').then(n => n._);
  for (const [_full, imagePath] of html.matchAll(CONTENT_LAYER_IMAGE_REGEX)) {
    try {
      const decodedImagePath = JSON.parse(imagePath.replaceAll("&#x22;", '"'));
      const id = imageSrcToImportId(decodedImagePath.src, fileName);
      const imported = imageAssetMap.get(id);
      if (!id || imageObjects.has(id) || !imported) {
        continue;
      }
      const image = await getImage({ ...decodedImagePath, src: imported });
      imageObjects.set(imagePath, image);
    } catch {
      throw new Error(`Failed to parse image reference: ${imagePath}`);
    }
  }
  return html.replaceAll(CONTENT_LAYER_IMAGE_REGEX, (full, imagePath) => {
    const image = imageObjects.get(imagePath);
    if (!image) {
      return full;
    }
    const { index, ...attributes } = image.attributes;
    return Object.entries({
      ...attributes,
      src: image.src,
      srcset: image.srcSet.attribute
    }).map(([key, value]) => value ? `${key}=${JSON.stringify(String(value))}` : "").join(" ");
  });
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function renderEntry(entry) {
  if (!entry) {
    throw new AstroError(RenderUndefinedEntryError);
  }
  if ("render" in entry && !("legacyId" in entry)) {
    return entry.render();
  }
  if (entry.deferredRender) {
    try {
      const { default: contentModules } = await import('./content-modules_BchkywM5.mjs');
      const renderEntryImport = contentModules.get(entry.filePath);
      return render({
        collection: "",
        id: entry.id,
        renderEntryImport
      });
    } catch (e) {
      console.error(e);
    }
  }
  const html = entry?.rendered?.metadata?.imagePaths?.length && entry.filePath ? await updateImageReferencesInBody(entry.rendered.html, entry.filePath) : entry?.rendered?.html;
  const Content = createComponent(() => renderTemplate`${unescapeHTML(html)}`);
  return {
    Content,
    headings: entry?.rendered?.metadata?.headings ?? [],
    remarkPluginFrontmatter: entry?.rendered?.metadata?.frontmatter ?? {}
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function createReference({ lookupMap }) {
  let store = null;
  globalDataStore.get().then((s) => store = s);
  return function reference(collection) {
    return z.union([
      z.string(),
      z.object({
        id: z.string(),
        collection: z.string()
      }),
      z.object({
        slug: z.string(),
        collection: z.string()
      })
    ]).transform(
      (lookup, ctx) => {
        if (!store) {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: `**${ctx.path.join(".")}:** Reference to ${collection} could not be resolved: store not available.
This is an Astro bug, so please file an issue at https://github.com/withastro/astro/issues.`
          });
          return;
        }
        const flattenedErrorPath = ctx.path.join(".");
        const collectionIsInStore = store.hasCollection(collection);
        if (typeof lookup === "object") {
          if (lookup.collection !== collection) {
            ctx.addIssue({
              code: ZodIssueCode.custom,
              message: `**${flattenedErrorPath}**: Reference to ${collection} invalid. Expected ${collection}. Received ${lookup.collection}.`
            });
            return;
          }
          return lookup;
        }
        if (collectionIsInStore) {
          const entry2 = store.get(collection, lookup);
          if (!entry2) {
            ctx.addIssue({
              code: ZodIssueCode.custom,
              message: `**${flattenedErrorPath}**: Reference to ${collection} invalid. Entry ${lookup} does not exist.`
            });
            return;
          }
          return { id: lookup, collection };
        }
        if (!lookupMap[collection] && store.collections().size <= 1) {
          return { id: lookup, collection };
        }
        const { type, entries } = lookupMap[collection];
        const entry = entries[lookup];
        if (!entry) {
          ctx.addIssue({
            code: ZodIssueCode.custom,
            message: `**${flattenedErrorPath}**: Reference to ${collection} invalid. Expected ${Object.keys(
              entries
            ).map((c) => JSON.stringify(c)).join(" | ")}. Received ${JSON.stringify(lookup)}.`
          });
          return;
        }
        if (type === "content") {
          return { slug: lookup, collection };
        }
        return { id: lookup, collection };
      }
    );
  };
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = "";
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = "";
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {};

new Set(Object.keys(lookupMap));

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = "";
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
});

createReference({ lookupMap });

class BlogData {
  /** 所有的英文 post，是否包含草稿取决于参数 */
  _enPosts = [];
  /** 所有的中文 post，是否包含草稿取决于参数 */
  _zhPosts = [];
  /** 所有中文文章中涉及的 Tag */
  _zhTags = [];
  /** 所有英文文章中涉及的 Tag */
  _enTags = [];
  /** 所有中文文章中涉及的 Category */
  _zhCategories = [];
  /** 所有英文文章中涉及的 Category */
  _enCategories = [];
  /** 所有中文文章的文件名，从 _zhPosts 提取，不包含前面的路径和/ */
  _zhPostSlugs = [];
  /** 所有英文文章的文件名，从 _enPosts 提取，不包含前面的路径和/ */
  _enPostSlugs = [];
  /** 所有可以被显示在列表中的中文文章，draft != fasle，showInList != false */
  _zhPostsInList = [];
  /** 所有可以被显示在列表中的英文文章，draft != fasle，showInList != false */
  _enPostsInList = [];
  /** 所有可以被显示在 RSS 中的中文文章，draft != fasle，showInRss != false */
  _zhPostsInRss = [];
  /** 所有可以被显示在 RSS 中的英文文章，draft != fasle，showInRss != false */
  _enPostsInRss = [];
  /** 所有不能被显示在列表中的中文文章 draf != fasle, showInList = fasle */
  _zhPostsNotInList = [];
  /** 所有不能被显示在列表中的英文文章 draf != fasle, showInList = fasle */
  _enPostsNotInList = [];
  /** 所有的英文合集 */
  _enCollections = [];
  /** 所有的中文合集 */
  _zhCollections = [];
  /** 可以显示在 homePage 的英文合集 */
  _enCollectionsInHomePage = [];
  /** 可以显示在 homePage 的中文合集 */
  _zhCollectionsInHomePage = [];
  /** TS 不支持异步的构造方法，但是可以在构造方法中不使用 await 调用异步函数。
   * 但是这样会导致做单元测试时，进行断言时，依赖构造方法调用的异步函数读取的数据尚未完成，导致断言失败。
   * 但是，在 Astro 的实际构造中，是不会出现这种情况的。不清楚具体的原因。
   * 因此，特别为单元测试提供了 prepareDataFromInput 方法，用于在单元测试中手动传入数据，并使用 await 等待数据加载完成后再进行断言。
   * loadDraft: 是否加载草稿
   * enableAutoLoad: 是否在构造方法中自动加载数据
   */
  constructor(loadDraft = false, enableAutoLoad = true) {
    if (enableAutoLoad) {
      this.prepareDataFromSiteContent(loadDraft);
    }
  }
  /** 从 Astro 的 siteContent 中加载数据 */
  async prepareDataFromSiteContent(loadDraft = false) {
    await this.loadData(loadDraft);
    this.classifyPosts();
    this.extractTagsAndCategories();
    this.classifyCollection();
  }
  // 从输入的数据中加载数据，用于单元测试
  async prepareDataFromInput(loadDraft, zhPosts = [], enPosts = [], zhCollections = [], enCollections = []) {
    this._zhPosts = zhPosts.filter((post) => loadDraft || !post.data.draft).sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
    this._enPosts = enPosts.filter((post) => loadDraft || !post.data.draft).sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
    this._zhCollections = zhCollections.filter((collection) => loadDraft || !collection.data.draft).sort((a, b) => {
      const priorityA = a.data.priority ?? 0;
      const priorityB = b.data.priority ?? 0;
      if (priorityA === priorityB) {
        return a.data.title.localeCompare(b.data.title);
      } else {
        return priorityB - priorityA;
      }
    });
    this._enCollections = enCollections.filter((collection) => loadDraft || !collection.data.draft).sort((a, b) => {
      const priorityA = a.data.priority ?? 0;
      const priorityB = b.data.priority ?? 0;
      if (priorityA === priorityB) {
        return a.data.title.localeCompare(b.data.title);
      } else {
        return priorityB - priorityA;
      }
    });
    this.classifyPosts();
    this.extractTagsAndCategories();
    this.classifyCollection();
  }
  /** 通过 Astro 的 getCollection，从站点数据中加载文章 */
  async loadData(loadDraft = false) {
    const posts = (await getCollection("blog")).filter((post) => loadDraft || !post.data.draft).sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
    posts.forEach((post) => {
      if (post.id.startsWith(`${Lang.ZH}/`)) {
        this._zhPosts.push(post);
      } else if (post.id.startsWith(`${Lang.EN}/`)) {
        this._enPosts.push(post);
      }
    });
    const collections = (await getCollection("collection")).filter((collection) => loadDraft || !collection.data.draft).sort((a, b) => {
      const priorityA = a.data.priority ?? 0;
      const priorityB = b.data.priority ?? 0;
      if (priorityA === priorityB) {
        return a.data.title.localeCompare(b.data.title);
      } else {
        return priorityB - priorityA;
      }
    });
    collections.forEach((collection) => {
      if (collection.id.startsWith(`${Lang.ZH}/`)) {
        this._zhCollections.push(collection);
      } else if (collection.id.startsWith(`${Lang.EN}/`)) {
        this._enCollections.push(collection);
      }
    });
  }
  classifyCollection() {
    this._zhCollectionsInHomePage = this._zhCollections;
    this._enCollectionsInHomePage = this._enCollections;
  }
  // 从 _zhPost 和 _enPost 中对 Post 进行分类
  classifyPosts() {
    this._zhPostsInList = this._zhPosts.filter((post) => post.data.showInList !== false);
    this._enPostsInList = this._enPosts.filter((post) => post.data.showInList !== false);
    this._zhPostsInRss = this._zhPosts.filter((post) => post.data.showInRss !== false);
    this._enPostsInRss = this._enPosts.filter((post) => post.data.showInRss !== false);
    this._zhPostsNotInList = this._zhPosts.filter((post) => post.data.showInList === false);
    this._enPostsNotInList = this._enPosts.filter((post) => post.data.showInList === false);
    this._zhPostSlugs = this._zhPosts.map((post) => urlHelper.extractPostNameFromSlug(post.slug)).filter((slug) => slug !== undefined);
    this._enPostSlugs = this._enPosts.map((post) => urlHelper.extractPostNameFromSlug(post.slug)).filter((slug) => slug !== undefined);
  }
  // 从 _zhPostsInList 和 _enPostsInList 中提取 Tag 和 Category
  extractTagsAndCategories() {
    this._enTags = this.processTags(this._enPostsInList);
    this._zhTags = this.processTags(this._zhPostsInList);
    this._enCategories = this.processCategories(this._enPostsInList);
    this._zhCategories = this.processCategories(this._zhPostsInList);
  }
  /* 从给定的文章中，提取并统计 Tag 信息 */
  processTags(posts) {
    return posts.map((post) => post.data.tags).filter((tags) => tags !== undefined).flat().reduce((acc, cur) => {
      if (cur) {
        const index = acc.findIndex((tag) => tag.name === cur);
        if (index === -1) {
          acc.push({ name: cur, count: 1 });
        } else {
          acc[index].count++;
        }
      }
      return acc;
    }, []).sort((a, b) => {
      const nameComparison = a.name[0].localeCompare(b.name[0]);
      if (nameComparison === 0) {
        return b.count - a.count;
      } else {
        return nameComparison;
      }
    });
  }
  /** 从给定的文章中，提取并统计分类信息 */
  processCategories(posts) {
    return posts.map((post) => post.data.category).filter((category) => category !== undefined).map((category) => category).reduce((acc, cur) => {
      const index = acc.findIndex((category) => category.name === cur);
      if (index === -1) {
        acc.push({ name: cur, count: 1 });
      } else {
        acc[index].count++;
      }
      return acc;
    }, []).sort((a, b) => {
      const nameComparison = a.name[0].localeCompare(b.name[0]);
      if (nameComparison === 0) {
        return b.count - a.count;
      } else {
        return nameComparison;
      }
    });
  }
  // 创建一个静态的 BlogData，用于单元测试
  static blogData = new BlogData();
}
const blogData = BlogData.blogData;

class DataOperator {
  blogData;
  constructor(blogData2) {
    this.blogData = blogData2;
  }
  // 根据给定的语言和 Tag，返回所有包含该 Tag 的文章
  async getPostsByTag(lang, tag) {
    switch (lang) {
      case Lang.EN:
        return this.blogData._enPostsInList.filter((post) => post.data.tags?.includes(tag));
      case Lang.ZH:
        return this.blogData._zhPostsInList.filter((post) => post.data.tags?.includes(tag));
    }
  }
  // 根据给定的语言和 Category，返回所有包含该 Category 的文章
  async getPostsByCategory(lang, category) {
    switch (lang) {
      case Lang.EN:
        return this.blogData._enPostsInList.filter((post) => post.data.category === category);
      case Lang.ZH:
        return this.blogData._zhPostsInList.filter((post) => post.data.category === category);
    }
  }
  // 获取给定语言下的所有 Tag
  async getTagsbyLang(lang) {
    switch (lang) {
      case Lang.EN:
        return this.blogData._enTags;
      case Lang.ZH:
        return this.blogData._zhTags;
    }
  }
  // 获取给定语言下的所有 Category
  async getCategoriesbyLang(lang) {
    switch (lang) {
      case Lang.EN:
        return this.blogData._enCategories;
      case Lang.ZH:
        return this.blogData._zhCategories;
    }
  }
  // 获取给定 post 的另一种语言的完整路径，包含 https 和域名，如果不存在则返回 null
  // 例如：输入 zh/hello-world，返回 https://www.fatbobman.com/en/posts/hello-world/
  getOtherLanguageAbsoluteURLWithPostSlug(slug) {
    const clearSlug = urlHelper.extractPostNameFromSlug(slug);
    const site = globalConfig.site;
    const trailingSlash = site.trailingSlash ? "/" : "";
    const generateUrl = (languageBase) => `${site.siteURL}${site.base}${languageBase}${site.postsBase}${clearSlug}${trailingSlash}`;
    if (languageHelper.isPostSlugStartingWithZH(slug)) {
      return this.blogData._enPostSlugs.includes(clearSlug) ? generateUrl(site.enBase) : null;
    } else {
      return this.blogData._zhPostSlugs.includes(clearSlug) ? generateUrl(site.zhBase) : null;
    }
  }
  // 获取给定 post 的另一种语言的相对路径，不包含 https 和域名，如果不存在则返回 null
  getOtherLanguageRelateWithPostSlug(slug) {
    const clearSlug = urlHelper.extractPostNameFromSlug(slug);
    const site = globalConfig.site;
    const trailingSlash = site.trailingSlash ? "/" : "";
    const generateUrl = (languageBase) => `${site.base}${languageBase}${site.postsBase}${clearSlug}${trailingSlash}`;
    if (languageHelper.isPostSlugStartingWithZH(slug)) {
      return this.blogData._enPostSlugs.includes(clearSlug) ? generateUrl(site.enBase) : null;
    } else {
      return this.blogData._zhPostSlugs.includes(clearSlug) ? generateUrl(site.zhBase) : null;
    }
  }
  // 根据给定的 slug，返回当前 post 的语言 Lang
  // 例如：输入 zh/hello-world，返回 Lang.ZH
  getLangByPostSlug(slug) {
    return languageHelper.isPostSlugStartingWithZH(slug) ? Lang.ZH : Lang.EN;
  }
  // 根据给定的语言和文章可见性，返回所有符合条件的文章，如果 limit 不为 null，则返回前 limit 个文章
  // 用于 rss，postslist，tag 等页面
  /**
   * Fetches filtered posts based on the specified language and post visibility type.
   *
   * @param lang - The language of the posts (Lang.EN or Lang.ZH).
   * @param type - The visibility type of the posts (PostVisibility.ALL, PostVisibility.LIST_VISIBLE, PostVisibility.RSS_VISIBLE, or PostVisibility.NOT_LIST_VISIBLE).
   * @param limit - The maximum number of posts to fetch (optional).
   * @returns An array of filtered posts.
   */
  async fetchFilteredPosts(lang, type, limit = null) {
    let posts = [];
    if (lang === Lang.EN) {
      switch (type) {
        case PostVisibility.ALL:
          posts = this.blogData._enPosts;
          break;
        case PostVisibility.LIST_VISIBLE:
          posts = this.blogData._enPostsInList;
          break;
        case PostVisibility.RSS_VISIBLE:
          posts = this.blogData._enPostsInRss;
          break;
        case PostVisibility.NOT_LIST_VISIBLE:
          posts = this.blogData._enPostsNotInList;
          break;
      }
    } else {
      switch (type) {
        case PostVisibility.ALL:
          posts = this.blogData._zhPosts;
          break;
        case PostVisibility.LIST_VISIBLE:
          posts = this.blogData._zhPostsInList;
          break;
        case PostVisibility.RSS_VISIBLE:
          posts = this.blogData._zhPostsInRss;
          break;
        case PostVisibility.NOT_LIST_VISIBLE:
          posts = this.blogData._zhPostsNotInList;
          break;
      }
    }
    return limit ? posts.slice(0, limit) : posts;
  }
  // 根据给定的字符串数组，从 _zhPostsInList 和 _enPostsInList 中提取 Post.uniqueId 对应的 Post，返回一个数组
  // 用户获取相关文章
  async fetchRelatedPostsByUniqueId(uniqueIds) {
    const posts = this.blogData._zhPostsInList.concat(this.blogData._enPostsInList);
    return posts.filter((post) => post.data.uniqueId !== undefined).filter((post) => uniqueIds.includes(post.data.uniqueId));
  }
  // 根据给定的语言，返回对应的所有合集
  async fetchCollectionsByLang(lang) {
    switch (lang) {
      case Lang.EN:
        return this.blogData._enCollections;
      case Lang.ZH:
        return this.blogData._zhCollections;
    }
  }
  // 根据给定的语言，返回对应的所有显示在首页的合集
  async fetchCollectionsInHomePageByLang(lang) {
    switch (lang) {
      case Lang.EN:
        return this.blogData._enCollectionsInHomePage;
      case Lang.ZH:
        return this.blogData._zhCollectionsInHomePage;
    }
  }
  // 返回给定 collection slug 的另一种语言的完整路径，包含 https 和域名，如果不存在则返回 null
  // slug 的格式为 zh/name 或 en/name
  // 例如：输入 zh/collection1，返回 https://www.fatbobman.com/en/collections/collection1/
  // 无需验证另一个版本是否有对应的文件，仅需将 zh 换成 en 或 en 换成 zh 即可
  async getOtherLanguageAbsoluteURLWithCollectionSlug(slug) {
    const clearSlug = urlHelper.extractPostNameFromSlug(slug);
    const lang = urlHelper.getLangFromPath(slug) === Lang.EN ? Lang.ZH : Lang.EN;
    const otherSlug = `${lang}/${clearSlug}`;
    const collections = await this.fetchCollectionsByLang(lang);
    if (collections.find((collection) => collection.slug === otherSlug) === undefined) {
      return null;
    } else {
      const site = globalConfig.site;
      const trailingSlash = site.trailingSlash ? "/" : "";
      const langBase = lang === Lang.EN ? site.enBase : site.zhBase;
      return `${site.siteURL}${site.base}${langBase}${site.collectionBase}${clearSlug}${trailingSlash}`;
    }
  }
  // 根据给定的 slug ，返回 post 的名称和相对路径url, 如果不存在则返回 null
  // slug 的格式为 zh/name 或 en/name
  // 例如：输入 zh/hello-world，返回 { name: 'hello-world', url: '/zh/posts/hello-world/' }
  async getPostNameAndRelativeURLWithPostSlug(slug) {
    const clearSlug = urlHelper.extractPostNameFromSlug(slug);
    const lang = urlHelper.getLangFromPath(slug);
    if (lang === null) {
      return null;
    }
    const posts = await this.fetchFilteredPosts(lang, PostVisibility.ALL);
    const post = posts.find((post2) => post2.slug === slug);
    if (post === undefined) {
      return null;
    } else {
      const site = globalConfig.site;
      const trailingSlash = site.trailingSlash ? "/" : "";
      const langBase = lang === Lang.EN ? site.enBase : site.zhBase;
      return {
        name: post.data.title,
        url: `${site.base}${langBase}${site.postsBase}${clearSlug}${trailingSlash}`
      };
    }
  }
  async getRelatedPostsbySlugs(slugs) {
    const posts = slugs.map(async (slug) => {
      const result = await this.getPostNameAndRelativeURLWithPostSlug(slug);
      return result;
    });
    return (await Promise.all(posts)).filter((post) => post !== null);
  }
  // 根据给定的 slug 和 Lang ，从对应的  _zhPostsInList 或 _enPostsInList 中提取给定 slug 的下一个值，如果不存在则返回 null
  // 例如：输入 zh/hello-world，返回 zh/second-post
  getNextPostBySlugAndLang(slug, lang) {
    const posts = lang === Lang.ZH ? this.blogData._zhPostsInList : this.blogData._enPostsInList;
    const index = posts.findIndex((post) => post.slug === slug);
    if (index === -1) {
      return null;
    } else {
      if (index === posts.length - 1) {
        return null;
      } else {
        return posts[index + 1].slug;
      }
    }
  }
  // 根据给定的 slug 和 Lang ，从对应的  _zhPostsInList 或 _enPostsInList 中提取给定 slug 的前一个值，如果不存在则返回 null
  // 例如：输入 zh/hello-world，返回 zh/second-post
  getPreviousPostBySlugAndLang(slug, lang) {
    const posts = lang === Lang.ZH ? this.blogData._zhPostsInList : this.blogData._enPostsInList;
    const index = posts.findIndex((post) => post.slug === slug);
    if (index === -1) {
      return null;
    } else {
      if (index === 0) {
        return null;
      } else {
        return posts[index - 1].slug;
      }
    }
  }
  // 根据给定的 slug 和 Lang，返回 CollectionEntry<'blog'>
  // 例如：输入 zh/hello-world，返回 CollectionEntry<'blog'>
  getPostBySlugAndLang(slug, lang) {
    const posts = lang === Lang.EN ? this.blogData._enPosts : this.blogData._zhPosts;
    return posts.find((post) => post.slug === slug);
  }
  // 接受一个字符串，对其中的文件进行处理。
  // 将在中文和英文之间，添加一个空格。
  // 例如： 中国ren -> 中国 ren
  // 如果后面是一个标点符号，则不添加空格
  // 例如： 中国ren, -> 中国 ren,
  // 如果前面是一个标点符号，则不添加空格
  // 例如： ,中国ren -> , 中国 ren
  // 如果前面是一个空格，则不添加空格
  // 例如： 中国 ren -> 中国 ren
  // 如果后面是一个空格，则不添加空格
  // 例如： 中国 ren -> 中国 ren
  // 如果字符串中没有中文或者英文，则不添加空格
  // 例如： 123456 -> 123456
  // 如果字符串中只有一个字母，则不添加空格
  // 例如： a -> a
  // 如果字符串中只有一个中文字符，则不添加空格
  // 例如： 中国 -> 中国
  // 如果字符串中只有一个数字，则不添加空格
  // 例如： 123456 -> 123456
  // 如果字符串中只有一个标点符号，则不添加空格
  // 例如： , -> ,
  // 如果字符串中只有一个空格，则不添加空格
  // 例如：  ->
  chineseDescription(description, lang) {
    if (lang === Lang.EN) {
      return description;
    }
    if (!/[\u4e00-\u9fa5]/.test(description) || !/[A-Za-z0-9]/.test(description)) {
      return description;
    }
    let result = description.replace(/([\u4e00-\u9fa5])([!-~])/g, "$1 $2");
    result = result.replace(/([!-~])([\u4e00-\u9fa5])/g, "$1 $2");
    return result;
  }
}
const dataOperator = new DataOperator(blogData);

class MetaDataHelper {
  langHelper = languageHelper;
  dataOperator;
  globalConfig = globalConfig;
  constructor(dataOperator2) {
    this.dataOperator = dataOperator2;
  }
  // 根据给定的语言和 URL 类型，返回对应的 metadata。仅用于目录页，例如 /zh/ /zh/posts/ 等
  async getMetaDataByLangAndUrlType(lang, type) {
    const site = lang === Lang.ZH ? globalConfig.site.nameZH : globalConfig.site.nameEN;
    const title = this.getTitleByLangAndUrlType(lang, type) + " | " + site;
    const description = this.getDescriptionByLangAndUrlType(lang, type);
    urlHelper.getCanonicalByLangAndUrlType(lang, type);
    const imageURL = lang === Lang.ZH ? globalConfig.site.imageZH : globalConfig.site.imageEN;
    const image = await findImage(imageURL);
    const openGraphType = type === URLType.ABOUT ? "profile" : "website";
    const openGraph = {
      title,
      type: openGraphType,
      ...image ? { images: [{ url: image, width: image?.width, height: image?.height }] } : {}
    };
    return { title, description, openGraph };
  }
  // 根据给定的语言和 Tag(string), 返回对应的 metadata
  async getMetaDataByTag(lang, tag) {
    const site = lang === Lang.ZH ? globalConfig.site.nameZH : globalConfig.site.nameEN;
    const title = `${tag} | ${site}`;
    const description = lang === Lang.EN ? `The Posts about ${tag}` : `有关 ${tag} 的文章`;
    const canonical = urlHelper.getTagPathByLangAndTag(lang, tag, true);
    const imageURL = lang === Lang.ZH ? globalConfig.site.imageZH : globalConfig.site.imageEN;
    const image = await findImage(imageURL);
    const openGraph = {
      title,
      type: "website",
      ...image ? { images: [{ url: image, width: image?.width, height: image?.height }] } : {}
    };
    return { title, description, openGraph, canonical };
  }
  // 根据给定的语言和 URL 类型，返回对应的 title。仅用于目录页，例如 /zh/ /zh/posts/ 等
  getTitleByLangAndUrlType(lang, type) {
    const t = languageHelper.buildTranslationForLang(lang);
    switch (type) {
      case URLType.LANGUAGE_ROOT:
        return t("metadata.title.langRoot");
      case URLType.POSTS:
        return t("metadata.title.posts");
      case URLType.TAGS:
        return t("metadata.title.tags");
      case URLType.CATEGORIES:
        return t("metadata.title.categories");
      case URLType.ABOUT:
        return t("metadata.title.about");
      case URLType.COLLECTIONS:
        return t("metadata.title.collections");
      case URLType.SPONSORSHIP:
        return t("metadata.title.sponsorship");
      case URLType.TIP:
        return t("metadata.title.tip");
      default:
        return t("metadata.title.home");
    }
  }
  // 根据给定的语言和 URL 类型，返回对应的 description。仅用于目录页，例如 /zh/ /zh/posts/ 等
  getDescriptionByLangAndUrlType(lang, type) {
    const t = languageHelper.buildTranslationForLang(lang);
    switch (type) {
      case URLType.LANGUAGE_ROOT:
        return t("metadata.description.langRoot", "null");
      case URLType.POSTS:
        return t("metadata.description.posts", "null");
      case URLType.TAGS:
        return t("metadata.description.tags", "null");
      case URLType.CATEGORIES:
        return t("metadata.description.categories", "null");
      case URLType.COLLECTIONS:
        return t("metadata.description.collections", "null");
      case URLType.ABOUT:
        return t("metadata.description.about", "null");
      case URLType.SPONSORSHIP:
        return t("metadata.description.sponsorship", "null");
      case URLType.TIP:
        return t("metadata.description.tip", "null");
      default:
        return t("metadata.description.home", "null");
    }
  }
  // 根据给定的 URL 类型，返回对应的 languageAlternates。仅用于目录页，例如 /zh/ /zh/posts/ 等
  getLanguageAlternateByUrlType(type) {
    const zhURL = urlHelper.getCanonicalByLangAndUrlType(Lang.ZH, type);
    const enURL = urlHelper.getCanonicalByLangAndUrlType(Lang.EN, type);
    return [
      {
        hrefLang: `${Lang.ZH}`,
        href: zhURL
      },
      {
        hrefLang: `${Lang.EN}`,
        href: enURL
      }
    ];
  }
  // 根据给定的语言和 Tag ，返回另外语言的对应的 languageAlternates（ 如果存在的话）
  async getLanguageAlternateByLangAndTag(lang, tag) {
    const posts = await this.dataOperator.getPostsByTag(lang, tag);
    if (posts.length === 0) {
      return null;
    } else {
      return urlHelper.getTagPathByLangAndTag(lang === Lang.ZH ? Lang.EN : Lang.ZH, tag, true);
    }
  }
  /**
   *
   * languageAlternates?: ReadonlyArray<LanguageAlternate>;
   *
   */
  async getMetaDataByWeeklyList(lang) {
    const name = lang === Lang.ZH ? "肘子的 Swift 周报" : "Fatbobman's Swift Weekly | Newsletter";
    const title = name;
    const description = lang === Lang.EN ? "The latest Swift( SwiftUI ) Weekly Newsletter, Share excellent articles about Swift, SwiftUI, Core Data, SwiftData, iOS, VisionOS, macOS every week" : "最新的 Swift（ SwiftUI ） 周报,每周分享优秀的 Swift、SwiftUI、Core Data、SwiftData、iOS、VisionOS、macOS 相关文章";
    const openGraph = {
      title,
      type: "article"
    };
    return { title, description, openGraph };
  }
  async getMetaDataByTipsList(lang) {
    const name = lang === Lang.ZH ? "Swift 和 SwiftUI 实用技巧与问答集锦" : "Tips and Q&A of Swift and SwiftUI";
    const title = name;
    const description = lang === Lang.EN ? "Tips of Swift, SwiftUI, Core Data and SwiftData" : "有关 Swift、SwiftUI、Core Data、SwiftUI 的各种实用技巧";
    const imageURL = "https://cdn.fatbobman.com/card/question-and-answer.webp";
    const image = await findImage(imageURL);
    const openGraph = {
      title,
      type: "article",
      ...image ? { images: [{ url: image, width: image?.width, height: image?.height }] } : {}
    };
    return { title, description, openGraph };
  }
  async getMetaDatabyWeekly(weekly) {
    const lang = this.dataOperator.getLangByPostSlug(weekly.slug);
    const name = lang === Lang.ZH ? "肘子的 Swift 周报 " : "Fatbobman's Swift Weekly ";
    const title = weekly.data.subtitle + " -- " + name + "#" + weekly.data.issue;
    const description = weekly.data.descriptionForSeo || weekly.data.description;
    const imageURL = "https://cdn.fatbobman.com/weekly/issue" + weekly.data.issue + ".webp";
    const image = await findImage(imageURL);
    const openGraph = {
      title,
      type: "article",
      ...image ? { images: [{ url: image, width: image?.width, height: image?.height }] } : {}
    };
    const postPath = urlHelper.getWeeklyPathBySlug(weekly.slug);
    const canonical = urlHelper.getCanonicalByPath(postPath);
    return { title, description, openGraph, canonical };
  }
  // 合成给定 Snippet 的 metadata
  async getMetaDataBySnippet(snippet) {
    const title = snippet.data.titleForSeo || snippet.data.title;
    const description = snippet.data.descriptionForSeo || snippet.data.description;
    const imageURL = "https://cdn.fatbobman.com/card/question-and-answer.webp";
    const image = await findImage(imageURL);
    const openGraph = {
      title,
      type: "article",
      ...image ? { images: [{ url: image, width: image?.width, height: image?.height }] } : {}
    };
    const postPath = urlHelper.getTipPathBySlug(snippet.slug);
    const canonical = urlHelper.getCanonicalByPath(postPath);
    return { title, description, openGraph, canonical };
  }
  // 合成给定 Post 的 metadata
  async getMetaDataByPost(post) {
    let title = post.data.titleForSeo || post.data.title;
    title = title.replace(/:/g, " -");
    const description = post.data.descriptionForSeo || post.data.description;
    const imageURL = post.data.twitterImage || post.data.image;
    const image = await findImage(imageURL);
    const openGraph = {
      title,
      type: "article",
      ...image ? { images: [{ url: image, width: image?.width, height: image?.height }] } : {}
    };
    const postPath = urlHelper.getPostPathBySlug(post.slug);
    const canonical = urlHelper.getCanonicalByPath(postPath);
    return { title, description, openGraph, canonical };
  }
  async getMetaDataOf404(lang) {
    const site = lang === Lang.ZH ? globalConfig.site.nameZH : globalConfig.site.nameEN;
    const title = "404 | " + site;
    const openGraph = {
      title
    };
    return { title, openGraph };
  }
  /** 根据给定的 collection 返回对应的 metaData */
  async getMetaDataByCollection(collection) {
    const lang = this.dataOperator.getLangByPostSlug(collection.slug);
    const site = lang === Lang.ZH ? globalConfig.site.nameZH : globalConfig.site.nameEN;
    const title = (collection.data.titleForSeo || collection.data.title) + " | " + site;
    const description = collection.data.descriptionForSeo || collection.data.description;
    const image = await findImage(collection.data.twitterImage || collection.data.image);
    const openGraph = {
      title,
      type: "article",
      ...image ? { images: [{ url: image, width: image?.width, height: image?.height }] } : {}
    };
    const collectionPath = urlHelper.getCollectionPathBySlugAndLang(collection.slug, lang);
    const canonical = urlHelper.getCanonicalByPath(collectionPath);
    return { title, description, openGraph, canonical };
  }
}
const metaDataHelper = new MetaDataHelper(dataOperator);

export { blogData as b, dataOperator as d, getCollection as g, metaDataHelper as m };
