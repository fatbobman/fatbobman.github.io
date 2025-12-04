import rss from '@astrojs/rss';
import { d as dataOperator, m as metaDataHelper } from './metaData_Cr-Y257r.mjs';
import { b as PostVisibility, u as urlHelper, U as URLType, F as FeedIDFORFOLLOW, L as Lang } from './images_Ck81mHQe.mjs';
import { w as weeklyHelper } from './weekly_DbXVvKYs.mjs';
import { s as snippetOperator } from './snippets_C28dQPqY.mjs';

async function generateRssByLang(lang, site, feedId, includeWeekly = true) {
  const posts = await dataOperator.fetchFilteredPosts(lang, PostVisibility.RSS_VISIBLE, 10);
  const postItems = posts.map((post) => ({
    title: post.data.title,
    link: urlHelper.getPostPathBySlug(post.slug),
    description: post.data.description || "",
    pubDate: post.data.publishDate,
    content: generateContentByPost(lang, post),
    tags: post.data.tags
  }));
  const weeklys = weeklyHelper.getWeelyIssues(lang).sort((a, b) => new Date(b.data.publishDate).getTime() - new Date(a.data.publishDate).getTime()).slice(0, 5);
  const weeklyItems = weeklys.map((weekly) => ({
    title: weeklyHelper.getTitleByIssue(lang, weekly.data.issue),
    link: weeklyHelper.getWeeklyURLby(lang, weekly.slug),
    description: weekly.data.description,
    pubDate: weekly.data.publishDate,
    content: generateContentByWeekly(lang, weekly),
    tags: ["weekly", "swift", "programming", "ios-development", "SwiftUI"]
  }));
  const start = new Date(2025, 2, 9);
  const tips = await snippetOperator.fetchFilteredSnippets(lang, PostVisibility.LIST_VISIBLE, null, start);
  const tipItems = tips.map((tip) => ({
    title: tipPrefix(lang, tip),
    link: snippetOperator.getSnippetURLby(lang, tip.slug),
    description: tip.data.description || "",
    pubDate: tip.data.publishDate,
    content: generateContentByTip(lang, tip),
    tags: tip.data.tags
  }));
  const allRssItems = postItems.concat(includeWeekly ? weeklyItems : []).concat(tipItems).sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  const metadata = await metaDataHelper.getMetaDataByLangAndUrlType(lang, URLType.LANGUAGE_ROOT);
  let feed = "";
  switch (feedId) {
    case FeedIDFORFOLLOW.ZHRSS:
      feed = "<follow_challenge><feedId>55086689794490368</feedId><userId>60878761419746304</userId></follow_challenge>";
      break;
    case FeedIDFORFOLLOW.ROOTFEED:
      feed = "<follow_challenge><feedId>61995827536643088</feedId><userId>60878761419746304</userId></follow_challenge>";
      break;
    case FeedIDFORFOLLOW.ROOTRSS:
      feed = "<follow_challenge><feedId>57718511161060352</feedId><userId>60878761419746304</userId></follow_challenge>";
      break;
    case FeedIDFORFOLLOW.ENRSS:
      feed = "<follow_challenge><feedId>69192030853292039</feedId><userId>60878761419746304</userId></follow_challenge>";
      break;
  }
  return rss({
    title: lang === Lang.ZH ? "肘子的 Swift 记事本 ｜ Fatbobman's Blog" : "Fatbobman's Blog",
    description: metadata.description.toString(),
    stylesheet: "/rss/styles.xsl",
    customData: `<language>${lang}</language>${feed}`,
    site,
    items: allRssItems.map((item) => ({
      title: item.title,
      link: item.link,
      description: item.description,
      pubDate: item.pubDate,
      author: "Fatbobman",
      categories: [
        ...new Set(
          ["computing", "swift", "learning", "programming", "swift-programming", "ios-development"].concat(item.tags ?? []).map((tag) => tag.toLowerCase())
        )
      ],
      content: item.content
    }))
  });
}
function generateContentByPost(lang, post) {
  const description = post.data.description || "";
  const postRelatedURL = urlHelper.getPostPathBySlug(post.slug);
  const postURL = urlHelper.getCanonicalByPath(postRelatedURL);
  const urlTip = lang === Lang.ZH ? "阅读全文" : "Read More";
  const rssTip = lang === Lang.ZH ? "Subscribe English RSS" : "订阅中文版 RSS";
  const otherLang = lang === Lang.ZH ? Lang.EN : Lang.ZH;
  const rssURL = otherLang === Lang.EN ? "https://fatbobman.com/rss.xml" : "https://fatbobman.com/zh/rss.xml";
  const urlButton = `<a href="${postURL}"><b>${urlTip}</b></a>`;
  const rssButton = `<a href="${rssURL}"><b>${rssTip}</b></a>`;
  const content = `<p>${description}</p>
                   <div style="margin-top: 20px;">
                   <p>${rssButton}</p>
                   </div>
                   <div style="margin-top: 20px;">
                   <p">${urlButton}</p>
                   </div>
                   `;
  return content;
}
function generateContentByWeekly(lang, weekly) {
  const description = weekly.data.description || "";
  const weeklyURL = weeklyHelper.getWeeklyURLby(lang, weekly.slug);
  const urlTip = lang === Lang.ZH ? "阅读全文" : "Read More";
  const rssTip = lang === Lang.ZH ? "Subscribe English RSS" : "订阅中文版 RSS";
  const otherLang = lang === Lang.ZH ? Lang.EN : Lang.ZH;
  const rssURL = otherLang === Lang.EN ? "https://fatbobman.com/rss.xml" : "https://fatbobman.com/zh/rss.xml";
  const urlButton = `<a href="${weeklyURL}"><b>${urlTip}</b></a>`;
  const rssButton = `<a href="${rssURL}"><b>${rssTip}</b></a>`;
  const content = `<p>${description}</p>
                   <div style="margin-top: 20px;">
                   <p>${rssButton}</p>
                   </div>
                   <div style="margin-top: 20px;">
                   <p">${urlButton}</p>
                   </div>
                   `;
  return content;
}
function generateContentByTip(lang, tip) {
  const description = tip.data.description || "";
  const url = snippetOperator.getSnippetURLby(lang, tip.slug);
  const urlTip = lang === Lang.ZH ? "阅读全文" : "Read More";
  const rssTip = lang === Lang.ZH ? "Subscribe English RSS" : "订阅中文版 RSS";
  const otherLang = lang === Lang.ZH ? Lang.EN : Lang.ZH;
  const rssURL = otherLang === Lang.EN ? "https://fatbobman.com/rss.xml" : "https://fatbobman.com/zh/rss.xml";
  const urlButton = `<a href="${url}"><b>${urlTip}</b></a>`;
  const rssButton = `<a href="${rssURL}"><b>${rssTip}</b></a>`;
  const content = `<p>${description}</p>
                   <div style="margin-top: 20px;">
                   <p>${rssButton}</p>
                   </div>
                   <div style="margin-top: 20px;">
                   <p">${urlButton}</p>
                   </div>
                   `;
  return content;
}
function tipPrefix(lang, tip) {
  const result = lang === Lang.EN ? `【Tips】` : `【小贴士】`;
  return result + tip.data.title;
}

export { generateRssByLang as g };
