import rss from '@astrojs/rss';
import { s as snippetOperator } from './snippets_C28dQPqY.mjs';
import { b as PostVisibility, u as urlHelper, U as URLType, F as FeedIDFORFOLLOW, L as Lang } from './images_Ck81mHQe.mjs';
import { m as metaDataHelper } from './metaData_Cr-Y257r.mjs';

async function generateRssByLang(lang, site, feedId) {
  const posts = await snippetOperator.fetchFilteredSnippets(lang, PostVisibility.ALL, 20);
  const postItems = posts.map((post) => ({
    title: post.data.title,
    link: urlHelper.getTipPathBySlug(post.slug),
    description: post.data.description || "",
    pubDate: post.data.publishDate,
    content: generateContentByPost(lang, post),
    tags: post.data.tags
  }));
  const metadata = await metaDataHelper.getMetaDataByLangAndUrlType(lang, URLType.TIP);
  let feed = "";
  switch (feedId) {
    case FeedIDFORFOLLOW.TIPENRSS:
      feed = "<follow_challenge><feedId>102712961573183488</feedId><userId>60878761419746304</userId></follow_challenge>";
      break;
    case FeedIDFORFOLLOW.TIPZHRSS:
      feed = "<follow_challenge><feedId>102701100187614208</feedId><userId>60878761419746304</userId></follow_challenge>";
      break;
  }
  return rss({
    title: lang === Lang.ZH ? "Swift、SwiftUI 问答与小贴士" : "Tips, Q&A | Fatbobman's Blog",
    description: metadata.description.toString(),
    stylesheet: "/rss/styles.xsl",
    customData: `<language>${lang}</language>${feed}`,
    site,
    items: postItems.map((item) => ({
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
  const postRelatedURL = urlHelper.getTipPathBySlug(post.slug);
  const postURL = urlHelper.getCanonicalByPath(postRelatedURL);
  const urlTip = lang === Lang.ZH ? "阅读全文" : "Read More";
  const rssTip = lang === Lang.ZH ? "Subscribe English RSS" : "订阅中文版 RSS";
  const otherLang = lang === Lang.ZH ? Lang.EN : Lang.ZH;
  const rssURL = otherLang === Lang.EN ? "https://fatbobman.com/en/snippet/rss.xml" : "https://fatbobman.com/zh/snippet/rss.xml";
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

export { generateRssByLang as g };
