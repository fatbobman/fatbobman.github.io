import { g as getCollection } from './metaData_Cr-Y257r.mjs';
import { L as Lang, u as urlHelper, g as globalConfig, b as PostVisibility } from './images_Ck81mHQe.mjs';
import { l as languageHelper } from './languages_C_U14EfB.mjs';

class SnippetData {
  _enSnippets = [];
  _zhSnippets = [];
  _enSnippetTags = [];
  _zhSnippetTags = [];
  _enSnippetsInList = [];
  _zhSnippetsInList = [];
  _enSnippetSlugs = [];
  _zhSnippetSlugs = [];
  constructor() {
    this.loadData();
  }
  async loadData() {
    const snippets = (await getCollection("snippet")).filter((snippet) => snippet.data.draft !== true).sort((a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime());
    snippets.forEach((snippet) => {
      if (snippet.id.startsWith(`${Lang.ZH}/`)) {
        this._zhSnippets.push(snippet);
      } else {
        this._enSnippets.push(snippet);
      }
    });
    this.classifySnippets();
    this.extractTags();
    this.extractSlugs();
  }
  /** 从 _enSnippets 和 _zhSnippets 中提取出 inList 的内容，置入  _enSnippetsInList 和 _zhSnippetsInList*/
  classifySnippets() {
    this._enSnippetsInList = this._enSnippets.filter((snippet) => snippet.data.showInList !== false);
    this._zhSnippetsInList = this._zhSnippets.filter((snippet) => snippet.data.showInList !== false);
  }
  // 从 _enSnippetsInList 和 _zhSnippetsInList 中提取出所有的 tag
  // 保存到 _enSnippetTags 和 _zhSnippetTags 中
  // 保证 Tag 的唯一性，记录每个 Tag 的数量
  // 根据 Tag 的名字，数量排序
  extractTags() {
    const tagMap = /* @__PURE__ */ new Map();
    this._enSnippetsInList.forEach((snippet) => {
      snippet.data.tags?.forEach((tag) => {
        if (tagMap.has(tag)) {
          tagMap.get(tag).count += 1;
        } else {
          tagMap.set(tag, {
            name: tag,
            count: 1
          });
        }
      });
    });
    this._zhSnippetsInList.forEach((snippet) => {
      snippet.data.tags?.forEach((tag) => {
        if (tagMap.has(tag)) {
          tagMap.get(tag).count += 1;
        } else {
          tagMap.set(tag, {
            name: tag,
            count: 1
          });
        }
      });
    });
    this._enSnippetTags = Array.from(tagMap.values()).sort((a, b) => b.count - a.count);
    this._zhSnippetTags = Array.from(tagMap.values()).sort((a, b) => b.count - a.count);
  }
  // 从 _enSnippetsInList 和 _zhSnippetsInList 中提取出所有的 slug
  // 保存到 _enSnippetSlugs 和 _zhSnippetSlugs 中
  // 保证 slug 的唯一性
  extractSlugs() {
    this._enSnippetSlugs = this._enSnippetsInList.map((snippet) => urlHelper.extractPostNameFromSlug(snippet.slug)).filter((slug) => slug !== undefined);
    this._zhSnippetSlugs = this._zhSnippetsInList.map((snippet) => urlHelper.extractPostNameFromSlug(snippet.slug)).filter((slug) => slug !== undefined);
  }
}
const snippetData = new SnippetData();
class SnippetOperator {
  snippetData = snippetData;
  // 根据给定的语言和 SnippetTag, 返回所有包含该 SnippetTag 的文章
  async getSnippetsByTag(lang, tag) {
    switch (lang) {
      case Lang.EN:
        return this.snippetData._enSnippetsInList.filter((snippet) => snippet.data.tags?.includes(tag));
      case Lang.ZH:
        return this.snippetData._zhSnippetsInList.filter((snippet) => snippet.data.tags?.includes(tag));
    }
  }
  // 获取给定语言下的所有 SnippetTag
  async getTagsbyLang(lang) {
    switch (lang) {
      case Lang.EN:
        return this.snippetData._enSnippetTags;
      case Lang.ZH:
        return this.snippetData._zhSnippetTags;
    }
  }
  // 获取给定 snippt 的另一种语言的完整路径，包含 https 和域名，如果不存在则返回 null
  // 例如：输入 zh/hello-world，返回 https://www.fatbobman.com/en/snipptes/hello-world/
  getOtherLanguageAbsoluteURLWithSnipptSlug(slug) {
    const clearSlug = urlHelper.extractPostNameFromSlug(slug);
    const site = globalConfig.site;
    const trailingSlash = site.trailingSlash ? "/" : "";
    const generateUrl = (languageBase) => `${site.siteURL}${site.base}${languageBase}${site.snipptesBase}${clearSlug}${trailingSlash}`;
    if (languageHelper.isPostSlugStartingWithZH(slug)) {
      return this.snippetData._enSnippetSlugs.includes(clearSlug) ? generateUrl(site.enBase) : null;
    } else {
      return this.snippetData._zhSnippetSlugs.includes(clearSlug) ? generateUrl(site.zhBase) : null;
    }
  }
  // 获取给定 Snippet 的另一种语言的相对路径，不包含 https 和域名，如果不存在则返回 null
  // 例如：输入 zh/hello-world，返回 /en/snipptes/hello-world/
  getOtherLanguageRelativeURLWithSnipptSlug(slug) {
    const clearSlug = urlHelper.extractPostNameFromSlug(slug);
    const site = globalConfig.site;
    const trailingSlash = site.trailingSlash ? "/" : "";
    const generateUrl = (languageBase) => `${site.base}${languageBase}${site.snipptesBase}${clearSlug}${trailingSlash}`;
    if (languageHelper.isPostSlugStartingWithZH(slug)) {
      return this.snippetData._enSnippetSlugs.includes(clearSlug) ? generateUrl(site.enBase) : null;
    } else {
      return this.snippetData._zhSnippetSlugs.includes(clearSlug) ? generateUrl(site.zhBase) : null;
    }
  }
  // 根据给定的 slug，返回当前 snippet 的语言 Lang
  // 例如：输入 zh/hello-world，返回 Lang.ZH
  getLanguageBySnipptSlug(slug) {
    return languageHelper.isPostSlugStartingWithZH(slug) ? Lang.ZH : Lang.EN;
  }
  getIconByTitle(title) {
    const randomIcon = ["🔑", "🚀", "🔍", "🔥", "🔋", "🔦", "🛎️"];
    const titleCount = title.length;
    const iconslength = randomIcon.length;
    const index = titleCount % iconslength;
    const icon = randomIcon[index];
    return icon;
  }
  // 根据给定的语言和文章可见性，返回所有符合条件的 snippet，如果 limit 不为 null，则返回前 limit 个文章
  // 用于 rss，postslist，tag 等页面
  async fetchFilteredSnippets(lang, type, limit = null, from = null) {
    let snippets = [];
    if (lang === Lang.EN) {
      switch (type) {
        case PostVisibility.ALL:
          snippets = this.snippetData._enSnippets;
          break;
        case PostVisibility.LIST_VISIBLE:
          snippets = this.snippetData._enSnippetsInList;
          break;
      }
    } else {
      switch (type) {
        case PostVisibility.ALL:
          snippets = this.snippetData._zhSnippets;
          break;
        case PostVisibility.LIST_VISIBLE:
          snippets = this.snippetData._zhSnippetsInList;
          break;
      }
    }
    if (from !== null) {
      snippets = snippets.filter((snippet) => snippet.data.publishDate.getTime() >= from.getTime());
    }
    if (limit !== null) {
      snippets = snippets.slice(0, limit);
    }
    return snippets;
  }
  // 根据给定的 slug ，返回 snippet 的名称和相对路径url, 如果不存在则返回 null
  // slug 的格式为 zh/name 或 en/name
  // 例如：输入 zh/hello-world，返回 { name: 'hello-world', url: '/zh/snippets/hello-world/' }
  async getSnippetNameAndURLWithSlug(slug) {
    const clearSlug = urlHelper.extractPostNameFromSlug(slug);
    const site = globalConfig.site;
    const trailingSlash = site.trailingSlash ? "/" : "";
    const generateUrl = (languageBase) => `${site.base}${languageBase}${site.snipptesBase}${clearSlug}${trailingSlash}`;
    if (languageHelper.isPostSlugStartingWithZH(slug)) {
      return this.snippetData._enSnippetSlugs.includes(clearSlug) ? { name: clearSlug, url: generateUrl(site.enBase) } : null;
    } else {
      return this.snippetData._zhSnippetSlugs.includes(clearSlug) ? { name: clearSlug, url: generateUrl(site.zhBase) } : null;
    }
  }
  // 根据给定的 slug 和 Lang，返回 CollectionEntry<'snippet'>
  // 例如：输入 zh/hello-world，返回 CollectionEntry<'snippet'>
  getSnippetBySlug(lang, slug) {
    const snippets = lang === Lang.EN ? this.snippetData._enSnippets : this.snippetData._zhSnippets;
    const snippet = snippets.find((snippet2) => snippet2.slug === slug);
    if (snippet !== undefined) {
      return snippet;
    } else {
      return undefined;
    }
  }
  // 根据给定的 lang 和 slug，返回另一种语言的 Snippet url
  getOtherLanguageRelate(lang, slug) {
    const prefix = lang === Lang.ZH ? "/en/snippet/" : "/zh/snippet/";
    return prefix + urlHelper.extractPostNameFromSlug(slug) + "/";
  }
  // 根据给定的语言,当前 slug，从所有的 Snippet 中随机返回指定数量的 Snippet
  // 要求返回的 Snippet 不包含当前 slug
  async getRandomSnippets(lang, currentSlug, count) {
    const snippets = lang === Lang.EN ? this.snippetData._enSnippetsInList : this.snippetData._zhSnippetsInList;
    const filteredSnippets = snippets.filter((snippet) => snippet.slug !== currentSlug);
    const result = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * filteredSnippets.length);
      result.push(filteredSnippets[randomIndex]);
      filteredSnippets.splice(randomIndex, 1);
    }
    return result;
  }
  // 根据 lang 和 slug 返回绝对地址
  getSnippetURLby(lang, slug) {
    const prefix = lang === Lang.ZH ? "/zh/snippet/" : "/en/snippet/";
    return prefix + urlHelper.extractPostNameFromSlug(slug) + "/";
  }
  getPreviousTip(lang, currentTipNumber) {
    const snippets = lang === Lang.EN ? this.snippetData._enSnippets : this.snippetData._zhSnippets;
    const previousTip = snippets.find((snippet) => snippet.data.number === currentTipNumber - 1);
    if (previousTip) {
      return {
        title: previousTip.data.title,
        url: this.getSnippetURLby(lang, previousTip.slug)
      };
    } else {
      return null;
    }
  }
  getNextTip(lang, currentTipNumber) {
    const snippets = lang === Lang.EN ? this.snippetData._enSnippets : this.snippetData._zhSnippets;
    const nextTip = snippets.find((snippet) => snippet.data.number === currentTipNumber + 1);
    if (nextTip) {
      return {
        title: nextTip.data.title,
        url: this.getSnippetURLby(lang, nextTip.slug)
      };
    } else {
      return null;
    }
  }
}
const snippetOperator = new SnippetOperator();

export { snippetOperator as s };
