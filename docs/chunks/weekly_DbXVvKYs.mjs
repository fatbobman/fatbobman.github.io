import { g as getCollection } from './metaData_Cr-Y257r.mjs';
import { L as Lang, u as urlHelper } from './images_Ck81mHQe.mjs';

class WeeklyHelper {
  enCharCountLimit = 120;
  //200;
  zhCharCountLimit = 70;
  //120;
  _enWeekly = [];
  _zhWeekly = [];
  constructor() {
    this.getWeeklys();
  }
  // 获取对应语言的所有周报内容
  getWeelyIssues(lang) {
    switch (lang) {
      case Lang.EN:
        return this._enWeekly;
      case Lang.ZH:
        return this._zhWeekly;
    }
  }
  // 根据给定的 issue ，获取上一期的周报 url
  getPreviousWeeklyUrl(lang, issue) {
    if (issue < 2) {
      return null;
    }
    let weeklys = [];
    switch (lang) {
      case Lang.EN:
        weeklys = this._enWeekly;
        break;
      case Lang.ZH:
        weeklys = this._zhWeekly;
        break;
    }
    weeklys = weeklys.sort((a, b) => a.data.issue - b.data.issue);
    const weekly = weeklys[issue - 2];
    const slug = weekly.slug;
    const prefix = lang === Lang.ZH ? "/zh/weekly/" : "/en/weekly/";
    return prefix + urlHelper.extractPostNameFromSlug(slug) + "/";
  }
  // 根据 lang 和 slug 返回绝对地址
  getWeeklyURLby(lang, slug) {
    const prefix = lang === Lang.ZH ? "https://fatbobman.com/zh/weekly/" : "https://fatbobman.com/en/weekly/";
    return prefix + urlHelper.extractPostNameFromSlug(slug) + "/";
  }
  getNextWeeklyUrl(lang, issue) {
    if (issue > this._enWeekly.length - 1) {
      return null;
    }
    let weeklys = [];
    switch (lang) {
      case Lang.EN:
        weeklys = this._enWeekly;
        break;
      case Lang.ZH:
        weeklys = this._zhWeekly;
        break;
    }
    weeklys = weeklys.sort((a, b) => a.data.issue - b.data.issue);
    const weekly = weeklys[issue];
    const slug = weekly.slug;
    const prefix = lang === Lang.ZH ? "/zh/weekly/" : "/en/weekly/";
    return prefix + urlHelper.extractPostNameFromSlug(slug) + "/";
  }
  getWeeklyList(lang) {
    let weeklys = [];
    switch (lang) {
      case Lang.EN:
        weeklys = this._enWeekly;
        break;
      case Lang.ZH:
        weeklys = this._zhWeekly;
        break;
    }
    weeklys = weeklys.sort((a, b) => b.data.issue - a.data.issue).filter((item) => item.data.draft !== true);
    return weeklys;
  }
  async getWeeklys() {
    await getCollection("weekly").then((weekly) => {
      this._enWeekly = weekly.filter((item) => this.isPostSlugStartingWithZH(item.slug) === false).sort((a, b) => b.data.issue - a.data.issue).filter((item) => item.data.draft !== true);
      this._zhWeekly = weekly.filter((item) => this.isPostSlugStartingWithZH(item.slug) === true).sort((a, b) => b.data.issue - a.data.issue).filter((item) => item.data.draft !== true);
    });
  }
  isPostSlugStartingWithZH(slug) {
    return slug.startsWith(`${Lang.ZH}/`);
  }
  // 根据给定语言，从 _enWeekly 或 _zhWeekly 中获取第一个元素
  getLatestWeekly(lang) {
    let weeklys = [];
    switch (lang) {
      case Lang.EN:
        weeklys = this._enWeekly;
        break;
      case Lang.ZH:
        weeklys = this._zhWeekly;
        break;
    }
    weeklys = weeklys.sort((a, b) => b.data.issue - a.data.issue);
    const weekly = weeklys[0];
    if (weekly) {
      const title = `Fatbobman's Swift Weekly #${weekly.data.issue}`;
      const issue = weekly.data.issue;
      const subtitle = weekly.data.subtitle;
      const url = weekly.data.url;
      const image = weekly.data.image;
      const count = lang === Lang.EN ? this.enCharCountLimit : this.zhCharCountLimit;
      const description = (weekly.data.description ?? weekly.data.descriptionForSeo).slice(0, count) + "...";
      const publishDate = weekly.data.publishDate;
      return { title, subtitle, url, image, description, publishDate, issue };
    } else {
      return null;
    }
  }
  // 根据给定语言，从 _enWeekly 或 _zhWeekly 中前30个内容中随机获取一个元素
  getRandomWeekly(lang) {
    let weekly;
    const count = this._zhWeekly.length;
    const limit = count > 30 ? 30 : count;
    switch (lang) {
      case Lang.EN:
        weekly = this._enWeekly[Math.floor(Math.random() * limit)];
        break;
      case Lang.ZH:
        weekly = this._zhWeekly[Math.floor(Math.random() * limit)];
        break;
    }
    if (weekly) {
      const title = `Weekly #${weekly.data.issue} - ${weekly.data.subtitle}`;
      const subtitle = weekly.data.subtitle;
      const url = lang === Lang.ZH ? `/zh/weekly/${urlHelper.extractPostNameFromSlug(weekly.slug)}/` : `/en/weekly/${urlHelper.extractPostNameFromSlug(weekly.slug)}/`;
      return { title, subtitle, url };
    } else {
      return null;
    }
  }
  // 根据给定语言，当前 issue，返回不多于 count 数的内容（ 周报名称 + 对应的 url）
  // 比如 count 为 5 , 当前 issue 为 10，返回的内容为前 （12,11,10,9,8) 的 名称和 url ,另外好要有一个 currentIssue:Boolean 来标识当前 issue
  getRecentWeekly(lang, issue, count) {
    let weeklys = [];
    switch (lang) {
      case Lang.EN:
        weeklys = this._enWeekly;
        break;
      case Lang.ZH:
        weeklys = this._zhWeekly;
        break;
    }
    weeklys = weeklys.sort((a, b) => b.data.issue - a.data.issue);
    const index = weeklys.findIndex((weekly) => weekly.data.issue === issue);
    const halfCount = Math.floor(count / 2);
    let start = index - halfCount < 0 ? 0 : index - halfCount;
    let end = start + count > weeklys.length ? weeklys.length : start + count;
    if (index - halfCount < 0) {
      end = count > weeklys.length ? weeklys.length : count;
    } else if (index + halfCount >= weeklys.length) {
      end = weeklys.length;
      start = end - count < 0 ? 0 : end - count;
    }
    const result = [];
    const currentTitle = lang === Lang.EN ? `#${issue} Current` : `#${issue} (当前)`;
    for (let i = start; i < end; i++) {
      const weekly = weeklys[i];
      const currentIssue = weekly.data.issue === issue;
      const title = currentIssue ? currentTitle : `${weekly.data.subtitle}`;
      const url = lang === Lang.ZH ? `/zh/weekly/${urlHelper.extractPostNameFromSlug(weekly.slug)}/` : `/en/weekly/${urlHelper.extractPostNameFromSlug(weekly.slug)}/`;
      const weeklyIssue = `${weekly.data.issue}`;
      result.push({ title, url, currentIssue, weeklyIssue });
    }
    return result;
  }
  // 根据给定的 lang 和 currentIssue，返回下一篇周报的 title 和 url，如果没有则返回 null
  // 例如，给定 lang 为 Lang.EN, currentIssue 为 10，返回 Weekly issue 为 11 的 title 和 url
  getNextWeekly(lang, currentIssue) {
    let weeklys = [];
    switch (lang) {
      case Lang.EN:
        weeklys = this._enWeekly;
        break;
      case Lang.ZH:
        weeklys = this._zhWeekly;
        break;
    }
    weeklys = weeklys.sort((a, b) => b.data.issue - a.data.issue);
    const nextWeekly = weeklys.find((weekly) => weekly.data.issue === currentIssue + 1);
    if (nextWeekly) {
      const title = `#${nextWeekly.data.issue} : ${nextWeekly.data.subtitle}`;
      const url = lang === Lang.ZH ? `/zh/weekly/${urlHelper.extractPostNameFromSlug(nextWeekly.slug)}` : `/en/weekly/${urlHelper.extractPostNameFromSlug(nextWeekly.slug)}`;
      return { title, url };
    } else {
      return null;
    }
  }
  // 根据给定的 lang 和 currentIssue，返回上一篇周报的 title 和 url，如果没有则返回 null
  // 例如，给定 lang 为 Lang.EN, currentIssue 为 10，返回 Weekly issue 为 9 的 title 和 url
  getPreviousWeekly(lang, currentIssue) {
    let weeklys = [];
    switch (lang) {
      case Lang.EN:
        weeklys = this._enWeekly;
        break;
      case Lang.ZH:
        weeklys = this._zhWeekly;
        break;
    }
    weeklys = weeklys.sort((a, b) => b.data.issue - a.data.issue);
    const previousWeekly = weeklys.find((weekly) => weekly.data.issue === currentIssue - 1);
    if (previousWeekly) {
      const title = `#${previousWeekly.data.issue} : ${previousWeekly.data.subtitle}`;
      const url = lang === Lang.ZH ? `/zh/weekly/${urlHelper.extractPostNameFromSlug(previousWeekly.slug)}` : `/en/weekly/${urlHelper.extractPostNameFromSlug(previousWeekly.slug)}`;
      return { title, url };
    } else {
      return null;
    }
  }
  getTitleByIssue(lang, issue) {
    let weeklys = [];
    switch (lang) {
      case Lang.EN:
        weeklys = this._enWeekly;
        break;
      case Lang.ZH:
        weeklys = this._zhWeekly;
        break;
    }
    const weekly = weeklys.find((weekly2) => weekly2.data.issue === issue);
    const weeklyName = lang === Lang.EN ? "Fatbobman's Swift Weekly" : "肘子的 Swift 周报";
    if (weekly) {
      return `${weekly.data.subtitle} - ${weeklyName} #${weekly.data.issue}`;
    } else {
      return "";
    }
  }
  // 根据给定的 lang 和 slug，返回另一种语言的周报 url
  getOtherLanguageRelateW(lang, slug) {
    const prefix = lang === Lang.ZH ? "/en/weekly/" : "/zh/weekly/";
    return prefix + urlHelper.extractPostNameFromSlug(slug) + "/";
  }
}
const weeklyHelper = new WeeklyHelper();

export { weeklyHelper as w };
