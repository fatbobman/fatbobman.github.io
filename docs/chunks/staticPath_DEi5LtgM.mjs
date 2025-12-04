import { d as dataOperator } from './metaData_Cr-Y257r.mjs';
import { b as PostVisibility, u as urlHelper } from './images_Ck81mHQe.mjs';
import { w as weeklyHelper } from './weekly_DbXVvKYs.mjs';
import { s as snippetOperator } from './snippets_C28dQPqY.mjs';

async function generateTagStaticPath(lang) {
  const tags = await dataOperator.getTagsbyLang(lang);
  return tags.map((tag) => ({
    params: {
      slug: tag.name.replace(/\s+/g, "-").trim()
      // Remove leading/trailing spaces
    },
    props: tag
  }));
}
async function generatePostStaticPath(lang) {
  const posts = await dataOperator.fetchFilteredPosts(lang, PostVisibility.LIST_VISIBLE);
  return posts.map((post) => ({
    params: { slug: urlHelper.extractPostNameFromSlug(post.slug) },
    props: post
  }));
}
async function generateWeeklyStaticPath(lang) {
  const weekly = weeklyHelper.getWeelyIssues(lang);
  return weekly.map((issue) => ({
    params: { slug: urlHelper.extractPostNameFromSlug(issue.slug) },
    props: issue
  }));
}
async function generateSnippetStaticPath(lang) {
  const snippets = await snippetOperator.fetchFilteredSnippets(lang, PostVisibility.LIST_VISIBLE);
  return snippets.map((snippet) => ({
    params: { slug: urlHelper.extractPostNameFromSlug(snippet.slug) },
    props: snippet
  }));
}
async function generateCollectionStaticPath(lang) {
  const collections = await dataOperator.fetchCollectionsByLang(lang);
  return collections.map((collection) => ({
    params: { slug: urlHelper.extractPostNameFromSlug(collection.slug) },
    props: collection
  }));
}

export { generatePostStaticPath as a, generateSnippetStaticPath as b, generateTagStaticPath as c, generateWeeklyStaticPath as d, generateCollectionStaticPath as g };
