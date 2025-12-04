import { e as createAstro, c as createComponent, r as renderTemplate, f as addAttribute, m as maybeRenderHead, g as renderSlot, a as renderComponent, d as defineScriptVars, b as renderScript } from './astro/server_C0quZjbu.mjs';
import 'kleur/colors';
import 'clsx';
import { D as DataSourceType, L as Lang, u as urlHelper } from './images_Ck81mHQe.mjs';
/* empty css                          */
import { w as weeklyHelper } from './weekly_DbXVvKYs.mjs';
import { s as snippetOperator } from './snippets_C28dQPqY.mjs';
import { i as icons } from './Footer_B4u8gcKS.mjs';
import { d as dataOperator } from './metaData_Cr-Y257r.mjs';
import { remark } from 'remark';
import html from 'remark-html';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';

var __freeze$4 = Object.freeze;
var __defProp$4 = Object.defineProperty;
var __template$4 = (cooked, raw) => __freeze$4(__defProp$4(cooked, "raw", { value: __freeze$4(cooked.slice()) }));
var _a$4;
const $$Astro$b = createAstro("https://fatbobman.com");
const $$Comment = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Comment;
  const { commentID, lang, source = DataSourceType.POST, anchor } = Astro2.props;
  function getCommentInfo(source2) {
    let repo2 = "";
    let createIssueManually2 = false;
    switch (source2) {
      case DataSourceType.POST: {
        repo2 = "blogComments";
        createIssueManually2 = true;
        break;
      }
      case DataSourceType.TIP: {
        repo2 = "TipComments";
        createIssueManually2 = false;
        break;
      }
      case DataSourceType.WEEKLY: {
        repo2 = "weeklyComments";
        createIssueManually2 = false;
        break;
      }
    }
    return { repo: repo2, createIssueManually: createIssueManually2 };
  }
  const { repo, createIssueManually } = getCommentInfo(source);
  return renderTemplate`${commentID && renderTemplate(_a$4 || (_a$4 = __template$4(["", '<div id="gitalk-container"', "", "", "", "", ` class="pb-16"></div>

    <script defer>
      document.addEventListener('DOMContentLoaded', async function () {
      const container = document.getElementById('gitalk-container');
      let anchor = '';
      if (container) {
        anchor = container.getAttribute('data-anchor') || '';
      }
        // \u63D0\u524D\u68C0\u67E5\u662F\u5426\u9700\u8981\u52A0\u8F7D\u8BC4\u8BBA
        try {
          const response = await fetch('https://fatbobman.com/status/comment');
          const data = await response.text();
          console.log(data, "comment");

          if (data !== '1') {
            console.log('\u8BC4\u8BBA\u529F\u80FD\u672A\u542F\u7528\uFF0C\u8DF3\u8FC7\u76D1\u63A7\u548C\u52A0\u8F7D\u64CD\u4F5C\u3002');
            return; // \u63D0\u524D\u8FD4\u56DE\uFF0C\u8DF3\u8FC7\u540E\u7EED\u903B\u8F91
          }
        } catch (error) {
          console.error('\u68C0\u67E5\u8BC4\u8BBA\u72B6\u6001\u65F6\u51FA\u9519\uFF1A', error);
          return; // \u51FA\u73B0\u9519\u8BEF\u65F6\u4E5F\u8DF3\u8FC7\u540E\u7EED\u903B\u8F91
        }

        // \u5982\u679C\u8FD4\u56DE\u503C\u4E3A "1"\uFF0C\u5219\u542F\u52A8\u89C2\u5BDF\u5668
        const observerTarget = document.getElementById(anchor);
        if (observerTarget) {
          const observer = new IntersectionObserver(async (entries, observer) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
              console.log("load comment")
              // \u505C\u6B62\u89C2\u5BDF\uFF0C\u907F\u514D\u91CD\u590D\u89E6\u53D1
              observer.unobserve(observerTarget);

              // \u52A8\u6001\u52A0\u8F7D\u8BC4\u8BBA\u533A\u811A\u672C
              await loadGitalk();
            }
          }, {
            root: null, // \u76F8\u5BF9\u4E8E\u89C6\u53E3
            rootMargin: '20%', // \u63D0\u524D 20% \u7684\u4F4D\u7F6E\u89E6\u53D1
            threshold: 0.1, // \u5143\u7D20\u663E\u793A 10% \u5373\u89E6\u53D1
          });

          observer.observe(observerTarget);
        }

        // \u52A8\u6001\u52A0\u8F7D Gitalk \u811A\u672C\u5E76\u521D\u59CB\u5316\u8BC4\u8BBA\u533A
        async function loadGitalk() {
          const container = document.getElementById('gitalk-container');
          if (container) {
            const commentID = container.getAttribute('data-comment-id');
            const lang = container.getAttribute('data-lang');
            const repo = container.getAttribute('data-repo')
            const createIssueManually = container.getAttribute('data-createIssueManually')

            console.log(repo);
            console.log(createIssueManually)

            // \u52A8\u6001\u52A0\u8F7D Gitalk \u811A\u672C
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js';
            script.defer = true;
            script.onload = () => {
              const gitalk = new Gitalk({
                clientID: 'fcf61195c7f73253dc8b',
                clientSecret: '0ac2907be08248a1fcb5312e27480ad535c682e5',
                repo: repo,
                owner: 'fatbobman',
                admin: ['fatbobman'],
                id: commentID.split('/').pop().substring(0, 49),
                distractionFreeMode: true,
                createIssueManually: createIssueManually,
                language: lang,
              });

              gitalk.render('gitalk-container');
            };
            document.body.appendChild(script);
          }
        }
      });
    <\/script>`])), maybeRenderHead(), addAttribute(commentID, "data-comment-id"), addAttribute(lang, "data-lang"), addAttribute(repo, "data-repo"), addAttribute(createIssueManually, "data-createIssueManually"), addAttribute(anchor, "data-anchor"))}`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/Comment.astro", undefined);

const $$Astro$a = createAstro("https://fatbobman.com");
const $$FloatButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$FloatButton;
  const { hoverColor = "text-secondary", width = 20, hidden = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`opacity-50 text-heading hover:opacity-100 ${!hidden ? "hover:" + hoverColor : ""} ${hidden ? "hover:opacity-50" : ""}`, "class")}${addAttribute(`width:${width}px; height:${width}px;`, "style")}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/FloatButton.astro", undefined);

const $$Astro$9 = createAstro("https://fatbobman.com");
const $$ShareWithTwitter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$ShareWithTwitter;
  const { post, lang, source } = Astro2.props;
  function getShareContent() {
    const hashtags2 = "ios,swiftlang";
    const via2 = "fatbobman";
    let title2 = "";
    let url2 = "";
    switch (source) {
      case DataSourceType.POST:
        if ("title" in post.data) {
          title2 = encodeURIComponent(post.data.title.replace(/@/g, ""));
          url2 = encodeURIComponent(urlHelper.getPostCanonicalPathBySlug(post.slug));
        }
        break;
      case DataSourceType.TIP:
        if ("title" in post.data) {
          title2 = encodeURIComponent((lang === Lang.ZH ? "\u5C0F\u8D34\u58EB\uFF1A" : "Tip: ") + post.data.title + "\n");
          url2 = encodeURIComponent(snippetOperator.getSnippetURLby(lang, post.slug) + "\n");
        }
        break;
      case DataSourceType.WEEKLY: {
        if ("issue" in post.data && "subtitle" in post.data) {
          const weeklyName = lang === Lang.EN ? "Fatbobman's Swift Weekly #" : "\u8098\u5B50\u7684 Swift \u5468\u520A #";
          title2 = encodeURIComponent(post.data.subtitle + " - " + weeklyName + post.data.issue + "\n");
          url2 = encodeURIComponent(weeklyHelper.getWeeklyURLby(lang, post.slug) + "\n");
        }
        break;
      }
    }
    return {
      title: title2,
      url: url2,
      hashtags: encodeURIComponent(hashtags2),
      via: via2
    };
  }
  const { title, url, hashtags, via } = getShareContent();
  const twitterShareUrl = `https://x.com/intent/tweet?text=${title}&url=${url}&hashtags=${hashtags}&via=${via}`;
  return renderTemplate`${renderComponent($$result, "FloatButton", $$FloatButton, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<a${addAttribute(twitterShareUrl, "href")} target="_blank" id="sidebar-share-with-twitter" data-tooltip-target="tooltip-share-with-twitter" data-tooltip-placement="left"> <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <use${addAttribute(icons + "#icon-twitter", "href")}></use> </svg> </a> ` })} <div id="tooltip-share-with-twitter" role="tooltip"${addAttribute(`absolute z-10 invisible inline-block px-3 py-2 w-32 text-sm font-medium text-gray-200 bg-gray-600/90 rounded-lg shadow-sm transition-opacity duration-300 tooltip dark:bg-gray-700/90`, "class")}> ${renderTemplate`<div> <div>Share on X</div> </div>`} <div class="tooltip-arrow" data-popper-arrow></div> </div>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/Buttons/ShareWithTwitter.astro", undefined);

const $$Astro$8 = createAstro("https://fatbobman.com");
const $$ShareWithFacebook = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$ShareWithFacebook;
  const { post, lang, source } = Astro2.props;
  function getShareUrl() {
    let url = "";
    switch (source) {
      case DataSourceType.POST:
        url = encodeURIComponent(urlHelper.getPostCanonicalPathBySlug(post.slug));
        break;
      case DataSourceType.TIP:
        url = encodeURIComponent(snippetOperator.getSnippetURLby(lang, post.slug));
        break;
      case DataSourceType.WEEKLY:
        url = encodeURIComponent(weeklyHelper.getWeeklyURLby(lang, post.slug));
        break;
    }
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  }
  const facebookShareUrl = getShareUrl();
  return renderTemplate`${renderComponent($$result, "FloatButton", $$FloatButton, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<a${addAttribute(facebookShareUrl, "href")} target="_blank" id="sidebar-share-with-facebook" data-tooltip-target="tooltip-share-with-facebook" data-tooltip-placement="left"> <svg stroke="currentColor" fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"> <use${addAttribute(icons + "#icon-facebook", "href")}></use> </svg> </a> ` })} <div id="tooltip-share-with-facebook" role="tooltip"${addAttribute(`absolute z-10 invisible inline-block px-3 py-2 w-44 text-sm font-medium text-gray-200 bg-gray-600/90 rounded-lg shadow-sm transition-opacity duration-300 tooltip dark:bg-gray-700/90`, "class")}> ${renderTemplate`<div> <div>Share on Facebook</div> </div>`} <div class="tooltip-arrow" data-popper-arrow></div> </div>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/Buttons/ShareWithFacebook.astro", undefined);

const $$Astro$7 = createAstro("https://fatbobman.com");
const $$ShareWithLinkedin = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$ShareWithLinkedin;
  const { post, lang, source } = Astro2.props;
  function getURL() {
    switch (source) {
      case DataSourceType.POST:
        return encodeURIComponent(urlHelper.getPostCanonicalPathBySlug(post.slug));
      case DataSourceType.TIP:
        return encodeURIComponent(snippetOperator.getSnippetURLby(lang, post.slug));
      case DataSourceType.WEEKLY:
        return encodeURIComponent(weeklyHelper.getWeeklyURLby(lang, post.slug));
    }
  }
  const url = getURL();
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  return renderTemplate`${renderComponent($$result, "FloatButton", $$FloatButton, { "width": 16 }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<a${addAttribute(linkedInShareUrl, "href")} target="_blank" id="sidebar-share-with-linkedin" data-tooltip-target="tooltip-share-with-linkedin" data-tooltip-placement="left"> <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="0.1" viewBox="0 0 15 15"> <use${addAttribute(icons + "#icon-linkedin", "href")}></use> </svg> </a> ` })} <div id="tooltip-share-with-linkedin" role="tooltip"${addAttribute(`absolute z-10 invisible inline-block px-3 py-2 w-40 text-sm font-medium text-gray-200 bg-gray-600/90 rounded-lg shadow-sm transition-opacity duration-300 tooltip dark:bg-gray-700/90`, "class")}> ${renderTemplate`<div> <div>Share on Linkedin</div> </div>`} <div class="tooltip-arrow" data-popper-arrow></div> </div>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/Buttons/ShareWithLinkedin.astro", undefined);

const $$Astro$6 = createAstro("https://fatbobman.com");
const $$ShareWithEmail = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$ShareWithEmail;
  const { post, lang, source } = Astro2.props;
  function getShareContent() {
    let title = "";
    let url = "";
    switch (source) {
      case DataSourceType.POST:
        if ("title" in post.data) {
          title = post.data.title.replace(/@/g, "");
          url = urlHelper.getPostCanonicalPathBySlug(post.slug);
        }
        break;
      case DataSourceType.TIP:
        if ("title" in post.data) {
          title = (lang === Lang.ZH ? "\u5C0F\u8D34\u58EB\uFF1A" : "Tip: ") + post.data.title;
          url = snippetOperator.getSnippetURLby(lang, post.slug);
        }
        break;
      case DataSourceType.WEEKLY: {
        if ("issue" in post.data && "subtitle" in post.data) {
          const weeklyName = lang === Lang.EN ? "Fatbobman's Swift Weekly #" : "\u8098\u5B50\u7684 Swift \u5468\u520A #";
          title = post.data.subtitle + " - " + weeklyName + post.data.issue;
          url = weeklyHelper.getWeeklyURLby(lang, post.slug);
        }
        break;
      }
    }
    const subject2 = lang === Lang.EN ? encodeURIComponent(`Article:\u3010${title}\u3011`) : encodeURIComponent(`\u6587\u7AE0:\u3010${title}\u3011`);
    const body2 = lang === Lang.EN ? encodeURIComponent(`Here's an article you may find interesting:

${title}

Link: ${url}`) : encodeURIComponent(`\u5206\u4EAB\u4E00\u7BC7\u6587\u7AE0\u7ED9\u4F60\uFF1A

${title}

\u94FE\u63A5: ${url}`);
    return { subject: subject2, body: body2 };
  }
  const { subject, body } = getShareContent();
  const emailShareUrl = `mailto:?subject=${subject}&body=${body}`;
  return renderTemplate`${renderComponent($$result, "FloatButton", $$FloatButton, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<a${addAttribute(emailShareUrl, "href")} target="_blank" id="sidebar-share-with-email" data-tooltip-target="tooltip-share-with-email" data-tooltip-placement="left"> <svg fill="currentColor" stroke="currentColor" stroke-width="20" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"> <use${addAttribute(icons + "#icon-email", "href")}></use> </svg> </a> ` })} <div id="tooltip-share-with-email" role="tooltip"${addAttribute(`absolute z-10 invisible inline-block px-3 py-2 w-40 text-sm font-medium text-gray-200 bg-gray-600/90 rounded-lg shadow-sm transition-opacity duration-300 tooltip dark:bg-gray-700/90`, "class")}> ${renderTemplate`<div> <div>Share via Email</div> </div>`} <div class="tooltip-arrow" data-popper-arrow></div> </div>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/Buttons/ShareWithEmail.astro", undefined);

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(cooked.slice()) }));
var _a$3;
const $$Astro$5 = createAstro("https://fatbobman.com");
const $$PreviousPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$PreviousPost;
  const { post, lang, source } = Astro2.props;
  function getNextContent() {
    let url2 = "";
    let title2 = "";
    let isHidden2 = false;
    switch (source) {
      case DataSourceType.POST: {
        const nextSlug = dataOperator.getNextPostBySlugAndLang(post.slug, lang);
        const nextPost = nextSlug && dataOperator.getPostBySlugAndLang(nextSlug, lang);
        url2 = nextSlug ? urlHelper.getPostPathBySlug(nextSlug) : "#";
        title2 = nextPost && nextPost.data && nextPost?.data.title || "";
        isHidden2 = nextSlug === null;
        break;
      }
      case DataSourceType.TIP: {
        if ("number" in post.data) {
          const nextTip = snippetOperator.getNextTip(lang, post.data.number);
          url2 = nextTip?.url || "#";
          title2 = nextTip?.title || "";
          isHidden2 = nextTip === null;
        }
        break;
      }
      case DataSourceType.WEEKLY: {
        if ("issue" in post.data) {
          const nextWeekly = weeklyHelper.getPreviousWeekly(lang, post.data.issue);
          url2 = nextWeekly?.url || "#";
          title2 = nextWeekly?.title || "";
          isHidden2 = nextWeekly === null;
        }
        break;
      }
    }
    return { url: url2, title: title2, isHidden: isHidden2 };
  }
  const modifierKey = "\u2325";
  const { url, title, isHidden } = getNextContent();
  return renderTemplate(_a$3 || (_a$3 = __template$3(["", ' <div id="tooltip-next-post" role="tooltip"', "> ", " </div> <script>(function(){", "\n  document.addEventListener('keydown', (e) => {\n    // Check if Alt+RightArrow or just RightArrow was pressed\n    if (e.altKey && e.key === 'ArrowLeft') {\n      // Only navigate if there's a URL and the button isn't hidden\n      if (url && !isHidden) {\n        e.preventDefault(); // Prevent default browser behavior\n        window.location.href = url;\n      }\n    }\n  });\n})();<\/script>"])), renderComponent($$result, "FloatButton", $$FloatButton, { "hidden": isHidden }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<button type="button"${addAttribute(`
      try {
        if ('${url}' !== '#') {
          window.location.href = '${url}';
        }
      } catch (e) {
        console.log('Navigation failed:', e);
      }
    `, "onclick")} data-tooltip-target="tooltip-next-post" data-tooltip-placement="left" id="sidebar-next-post"${addAttribute(isHidden ? "text-gray-300 dark:text-gray-600 pointer-events-none" : "cursor-pointer", "class")} aria-label="Next post"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"> <use${addAttribute(icons + "#icon-previous", "href")}></use> </svg> </button> ` }), addAttribute(`absolute z-10 ${isHidden ? "hidden" : "invisible"} inline-block px-3 py-2 w-44 text-sm font-medium text-gray-200 bg-gray-600/90 rounded-lg shadow-sm transition-opacity duration-300 tooltip dark:bg-gray-700/90`, "class"), !isHidden && renderTemplate`<div> <div>${title}</div> <div class="text-xs text-yellow-200 font-extrabold pt-2">${modifierKey} + ←</div> </div>`, defineScriptVars({ url, isHidden }));
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/Buttons/PreviousPost.astro", undefined);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$Astro$4 = createAstro("https://fatbobman.com");
const $$NextPost = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$NextPost;
  const { post, lang, source } = Astro2.props;
  function getPreviousContent() {
    let url2 = "";
    let title2 = "";
    let isHidden2 = false;
    switch (source) {
      case DataSourceType.POST: {
        const previousSlug = dataOperator.getPreviousPostBySlugAndLang(post.slug, lang);
        const previousPost = previousSlug && dataOperator.getPostBySlugAndLang(previousSlug, lang);
        url2 = previousSlug ? urlHelper.getPostPathBySlug(previousSlug) : "#";
        title2 = previousPost && previousPost.data && previousPost?.data.title || "";
        isHidden2 = previousSlug === null;
        break;
      }
      case DataSourceType.TIP: {
        if ("number" in post.data) {
          const previousPost = snippetOperator.getPreviousTip(lang, post.data.number);
          url2 = previousPost?.url || "#";
          title2 = previousPost?.title || "";
          isHidden2 = previousPost === null;
        }
        break;
      }
      case DataSourceType.WEEKLY: {
        if ("issue" in post.data) {
          const previousPost = weeklyHelper.getNextWeekly(lang, post.data.issue);
          url2 = previousPost?.url || "#";
          title2 = previousPost?.title || "";
          isHidden2 = previousPost === null;
        }
        break;
      }
    }
    return { url: url2, title: title2, isHidden: isHidden2 };
  }
  const { url, title, isHidden } = getPreviousContent();
  const modifierKey = "\u2325";
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", ' <div id="tooltip-previous-post" role="tooltip"', "> ", ' <div class="tooltip-arrow" data-popper-arrow></div> </div> <script>(function(){', "\n  document.addEventListener('keydown', (e) => {\n    // Check if Alt+RightArrow or just RightArrow was pressed\n    if (e.altKey && e.key === 'ArrowRight') {\n      // Only navigate if there's a URL and the button isn't hidden\n      if (url && !isHidden) {\n        e.preventDefault(); // Prevent default browser behavior\n        window.location.href = url;\n      }\n    }\n  });\n})();<\/script>"])), renderComponent($$result, "FloatButton", $$FloatButton, { "hidden": isHidden }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<button type="button"${addAttribute(`
      try {
        if ('${url}' !== '#') {
          window.location.href = '${url}';
        }
      } catch (e) {
        console.log('Navigation failed:', e);
      }
    `, "onclick")} data-tooltip-target="tooltip-previous-post" data-tooltip-placement="left" id="sidebar-previous-post"${addAttribute(isHidden ? "text-gray-300 dark:text-gray-600 pointer-events-none" : "cursor-pointer", "class")} aria-label="Previous post"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"> <use${addAttribute(icons + "#icon-next", "href")}></use> </svg> </button> ` }), addAttribute(`absolute z-10 ${isHidden ? "hidden" : "invisible"} inline-block px-3 py-2 w-44 text-sm font-medium text-gray-200 bg-gray-600/90 rounded-lg shadow-sm transition-opacity duration-300 tooltip dark:bg-gray-700/90`, "class"), !isHidden && renderTemplate`<div> <div>${title}</div> <div class="text-xs text-yellow-200 font-extrabold pt-2">${modifierKey + " + \u2192"}</div> </div>`, defineScriptVars({ url, isHidden }));
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/Buttons/NextPost.astro", undefined);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$CommentButton = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", ' <div id="tooltip-share-with-comment" role="tooltip"', "> ", ` <div class="tooltip-arrow" data-popper-arrow></div> </div> <script>
  const SCROLL_OFFSET = 80;
  
  document.addEventListener('DOMContentLoaded', function() {
    const commentButton = document.getElementById('comment-button');
    if (commentButton) {
      commentButton.addEventListener('click', function() {
        const gitalkContainer = document.getElementById('gitalk-container');
        if (gitalkContainer) {
          const topPosition = gitalkContainer.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
          window.scrollTo({ top: topPosition, behavior: 'smooth' });
        }
      });
    }
  });
<\/script>`])), renderComponent($$result, "FloatButton", $$FloatButton, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<svg fill="currentColor" stroke="currentColor" stroke-width="20" id="comment-button" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" data-tooltip-target="tooltip-share-with-comment" data-tooltip-placement="left"> <use${addAttribute(icons + "#icon-comment", "href")}></use> </svg> ` }), addAttribute(`absolute z-10 invisible inline-block px-3 py-2 w-44 text-sm font-medium text-gray-200 bg-gray-600/90 rounded-lg shadow-sm transition-opacity duration-300 tooltip dark:bg-gray-700/90`, "class"), renderTemplate`<div> <div>Share Your Thoughts</div> </div>`);
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/Buttons/CommentButton.astro", undefined);

const $$TopButton = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "FloatButton", $$FloatButton, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<svg fill="currentColor" stroke="currentColor" onclick="window.scrollTo({top:0,behavior:'smooth'})" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" data-tooltip-target="tooltip-back-to-top" data-tooltip-placement="left"> <use${addAttribute(icons + "#icon-top", "href")}></use> </svg> ` })} <div id="tooltip-back-to-top" role="tooltip"${addAttribute(`absolute z-10 invisible inline-block px-3 py-2 w-28 text-sm font-medium text-gray-200 bg-gray-600/90 rounded-lg shadow-sm transition-opacity duration-300 tooltip dark:bg-gray-700/90`, "class")}> ${renderTemplate`<div> <div>Back to Top</div> </div>`} <div class="tooltip-arrow" data-popper-arrow></div> </div>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/Buttons/TopButton.astro", undefined);

const $$Astro$3 = createAstro("https://fatbobman.com");
const $$ShareWithWeibo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ShareWithWeibo;
  const { post, lang, source } = Astro2.props;
  function getShareContent() {
    let title2 = "";
    let url2 = "";
    switch (source) {
      case DataSourceType.POST:
        if ("title" in post.data) {
          title2 = post.data.title.replace(/@/g, "");
          url2 = urlHelper.getPostCanonicalPathBySlug(post.slug);
        }
        break;
      case DataSourceType.TIP:
        if ("title" in post.data) {
          title2 = (lang === Lang.ZH ? "\u5C0F\u8D34\u58EB\uFF1A" : "Tip: ") + post.data.title;
          url2 = snippetOperator.getSnippetURLby(lang, post.slug);
        }
        break;
      case DataSourceType.WEEKLY: {
        if ("issue" in post.data && "subtitle" in post.data) {
          const weeklyName = lang === Lang.EN ? "Fatbobman's Swift Weekly #" : "\u8098\u5B50\u7684 Swift \u5468\u520A #";
          title2 = post.data.subtitle + "-" + weeklyName + post.data.issue;
          url2 = weeklyHelper.getWeeklyURLby(lang, post.slug);
        }
        break;
      }
    }
    return { title: title2, url: url2 };
  }
  const { title, url } = getShareContent();
  const encodedTitle = encodeURIComponent(title + "\n #ios #swift\n by @fatbobman\n");
  const encodedUrl = encodeURIComponent(url);
  const weiboShareUrl = `https://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedTitle}`;
  return renderTemplate`${renderComponent($$result, "FloatButton", $$FloatButton, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<a${addAttribute(weiboShareUrl, "href")} target="_blank" id="sidebar-share-with-weibo" data-tooltip-target="tooltip-share-with-weibo" data-tooltip-placement="left"> <svg fill="currentColor" stroke="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"> <use${addAttribute(icons + "#icon-weibo", "href")}></use> </svg> </a> ` })} <div id="tooltip-share-with-weibo" role="tooltip"${addAttribute(`absolute z-10 invisible inline-block px-3 py-2 w-40 text-sm font-medium text-gray-200 bg-gray-600/90 rounded-lg shadow-sm transition-opacity duration-300 tooltip dark:bg-gray-700/90`, "class")}> ${renderTemplate`<div> <div>Share on Weibo</div> </div>`} <div class="tooltip-arrow" data-popper-arrow></div> </div>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/Buttons/ShareWithWeibo.astro", undefined);

const $$Astro$2 = createAstro("https://fatbobman.com");
const $$ShareWithBlueSky = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ShareWithBlueSky;
  const { post, lang, source } = Astro2.props;
  function getShareContent() {
    let title2 = "";
    let url2 = "";
    switch (source) {
      case DataSourceType.POST:
        if ("title" in post.data) {
          title2 = encodeURIComponent(post.data.title.replace(/@/g, ""));
          url2 = encodeURIComponent(urlHelper.getPostCanonicalPathBySlug(post.slug));
        }
        break;
      case DataSourceType.TIP:
        if ("title" in post.data) {
          title2 = encodeURIComponent((lang === Lang.ZH ? "\u5C0F\u8D34\u58EB\uFF1A" : "Tip: ") + post.data.title + "\n");
          url2 = encodeURIComponent(snippetOperator.getSnippetURLby(lang, post.slug) + "\n");
        }
        break;
      case DataSourceType.WEEKLY: {
        if ("issue" in post.data && "subtitle" in post.data) {
          const weeklyName = lang === Lang.EN ? "Fatbobman's Swift Weekly #" : "\u8098\u5B50\u7684 Swift \u5468\u520A #";
          title2 = encodeURIComponent(post.data.subtitle + " - " + weeklyName + post.data.issue + "\n");
          url2 = encodeURIComponent(weeklyHelper.getWeeklyURLby(lang, post.slug) + "\n");
        }
        break;
      }
    }
    return { title: title2, url: url2 };
  }
  const { title, url } = getShareContent();
  const via = "%40fatbobman.com ";
  const text = title + "%0A by " + via + "%0A" + url + "%0A #ios #swift";
  const blueSkeyShareUrl = `https://bsky.app/intent/compose?text=${text}`;
  return renderTemplate`${renderComponent($$result, "FloatButton", $$FloatButton, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<button type="button"${addAttribute(`
      try {
        window.open('${blueSkeyShareUrl}', '_blank');
      } catch (e) {
        console.log('Failed to open BlueSky share');
      }
    `, "onclick")} id="sidebar-share-with-bluesky" data-tooltip-target="tooltip-share-with-bluesky" data-tooltip-placement="left" class="cursor-pointer" aria-label="Share on BlueSky"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke-width="0.4" stroke="currentColor" fill="currentColor" stroke-linecap="round" stroke-linejoin="round"> <use${addAttribute(icons + "#icon-bluesky", "href")}></use> </svg> </button> ` })} <div id="tooltip-share-with-bluesky" role="tooltip"${addAttribute(`absolute z-10 invisible inline-block px-3 py-2 w-40 text-sm font-medium text-gray-200 bg-gray-600/90 rounded-lg shadow-sm transition-opacity duration-300 tooltip dark:bg-gray-700/90`, "class")}> ${renderTemplate`<div> <div>Share on BlueSky</div> </div>`} <div class="tooltip-arrow" data-popper-arrow></div> </div>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/Buttons/ShareWithBlueSky.astro", undefined);

const $$Astro$1 = createAstro("https://fatbobman.com");
const $$SideBar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$SideBar;
  const { lang, post, source } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="hidden md:block md:absolute" id="sidebar" style="right: -50px; top: 0px"> <div class="invisible flex flex-col space-y-4 text-muted items-center justify-center opacity-0 transition-all duration-1000 delay-300 ease-out" id="sidebar-content"> ${renderComponent($$result, "PreviousPost", $$PreviousPost, { "lang": lang, "post": post, "source": source })} ${renderComponent($$result, "NextPost", $$NextPost, { "lang": lang, "post": post, "source": source })} <!-- <DictButton lang={lang} post = {post}/> --> ${renderComponent($$result, "ShareWithTwitter", $$ShareWithTwitter, { "lang": lang, "post": post, "source": source })} ${renderComponent($$result, "ShareWithBlueSky", $$ShareWithBlueSky, { "lang": lang, "post": post, "source": source })} ${renderComponent($$result, "ShareWithFacebook", $$ShareWithFacebook, { "lang": lang, "post": post, "source": source })} ${lang === Lang.ZH && renderTemplate`${renderComponent($$result, "ShareWithWeibo", $$ShareWithWeibo, { "lang": lang, "post": post, "source": source })}`} ${renderComponent($$result, "ShareWithLinkedin", $$ShareWithLinkedin, { "lang": lang, "post": post, "source": source })} ${renderComponent($$result, "ShareWithEmail", $$ShareWithEmail, { "lang": lang, "post": post, "source": source })} ${renderComponent($$result, "CommentButton", $$CommentButton, {})} ${renderComponent($$result, "TopButton", $$TopButton, {})} </div> </div> ${renderScript($$result, "/Users/yangxu/Astro/FatBlog/src/components/widgets/SideBar.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/SideBar.astro", undefined);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$CopyCodeButtonJS = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template([`<script>
function copyCode(button, event) {
  event.preventDefault();
  const codeBlock = button.parentNode.nextElementSibling.textContent; // \u83B7\u53D6\u4EE3\u7801\u5185\u5BB9
  navigator.clipboard.writeText(codeBlock).then(() => {
    // \u663E\u793A "Copied"
    button.querySelector('.copy-text').style.display = 'none';
    button.querySelector('.copied-text').style.display = 'inline';

    // 3\u79D2\u540E\u6062\u590D
    setTimeout(() => {
      button.querySelector('.copy-text').style.display = 'inline';
      button.querySelector('.copied-text').style.display = 'none';
    }, 3000);
  });
}
<\/script>`])));
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/CopyCodeButtonJS.astro", undefined);

const $$CopyCodeSvg = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg style="display: none;"> <symbol id="icon-clipboard" viewBox="0 0 1024 1024"> <path d="M426.666667 42.666667l170.666667 0q41.344 0 74.325333 23.850667t46.336 61.482667l50.005333 0q52.992 0 90.496 37.504t37.504 90.496l0 597.333333q0 52.992-37.504 90.496t-90.496 37.504l-512 0q-52.992 0-90.496-37.504t-37.504-90.496l0-597.333333q0-52.992 37.504-90.496t90.496-37.504l50.005333 0q13.312-37.674667 46.336-61.482667t74.325333-23.850667zM768 213.333333l-50.005333 0q-13.312 37.674667-46.336 61.482667t-74.325333 23.850667l-170.666667 0q-41.344 0-74.325333-23.850667t-46.336-61.482667l-50.005333 0q-17.664 0-30.165333 12.501333t-12.501333 30.165333l0 597.333333q0 17.664 12.501333 30.165333t30.165333 12.501333l512 0q17.664 0 30.165333-12.501333t12.501333-30.165333l0-597.333333q0-17.664-12.501333-30.165333t-30.165333-12.501333zM597.333333 128l-170.666667 0q-17.664 0-30.165333 12.501333t-12.501333 30.165333 12.501333 30.165333 30.165333 12.501333l170.666667 0q17.664 0 30.165333-12.501333t12.501333-30.165333-12.501333-30.165333-30.165333-12.501333z"></path> </symbol> <symbol id="icon-check" viewBox="0 0 1024 1024"> <path d="M421.858 683.366l401.796-448.518c18.66-20.828 50.668-22.586 71.498-3.928 20.828 18.66 22.586 50.67 3.928 71.498L463.638 788.494c-18.606 20.768-50.5 22.586-71.344 4.066l-263.29-233.924c-20.906-18.572-22.796-50.576-4.222-71.48 18.574-20.906 50.576-22.796 71.48-4.222L421.86 683.366z"></path> </symbol> </svg>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/CopyCodeSvg.astro", undefined);

const extractHeadings = async (markdown, source) => {
  const processor = remark().use(html);
  const type = source === DataSourceType.WEEKLY ? 2 : 1;
  const headings = [];
  const ast = processor.parse(markdown);
  visit(ast, "heading", (node) => {
    if (type === 1) {
      if (node.depth === 2 || node.depth === 3) {
        getHeading(node, headings);
      }
    } else {
      if (node.depth === 3) {
        getHeading(node, headings);
      }
    }
  });
  return headings;
};
function getHeading(node, headings) {
  let id = "";
  const fullText = toString(node);
  id = fullText.toLowerCase().replace(/\s+/g, "-");
  id = id.replace(/[()&'`""、｜/?:：（）？！，@$!.+=————、，。；;,–—…’“”\\%^#‘ ≥~½*」「]/g, "");
  id = id.replace(
    /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2B50}\u{1F004}\u{1F0CF}\u{1F1E6}-\u{1F1FF}]/gu,
    ""
  );
  id = id.replace(/-$/, "");
  headings.push({
    depth: node.depth,
    value: fullText,
    // 使用完整文本作为值
    id
  });
}

const $$TOCButton = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "FloatButton", $$FloatButton, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<svg fill="currentColor" stroke="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" id="toc-list-switcher"> <use${addAttribute(icons + "#icon-toc", "href")}></use> </svg> <svg fill="currentColor" stroke="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" id="toc-list-close" class="hidden"> <use${addAttribute(icons + "#icon-toc-close", "href")}></use> </svg> ` })}`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/Buttons/TOCButton.astro", undefined);

const $$Astro = createAstro("https://fatbobman.com");
const $$TOC = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TOC;
  const { body, source } = Astro2.props;
  const headings = await extractHeadings(body, source);
  const isWeekly = source == DataSourceType.WEEKLY ? true : false;
  return renderTemplate`${maybeRenderHead()}<div class="hidden lg:block w-32 xl:w-44 lg:absolute" id="toc" style="left: -30px; top: 0px"> <div class="text-muted items-center justify-center opacity-0 transition-all duration-1000 delay-300 ease-out" id="toc-content"> <div class="w-full flex justify-end pb-2" id="toc-float-button"> ${renderComponent($$result, "TOCButton", $$TOCButton, {})} </div> <div class="text-default text-xxs xl:text-xs hidden" id="toc-list"> <ul> ${!isWeekly && headings.map((heading) => renderTemplate`<li${addAttribute(`${heading.depth == 3 ? "xl:pl-4 pl-1" : ""} pb-1`, "class")}> <div class="text-muted hover:text-secondary hover:font-black"> <a${addAttribute(`#${heading.id}`, "href")}${addAttribute(`${heading.depth == 2 ? 'inline-block hover:text-secondary text-heading font-medium relative before:hidden xl:before:block before:content-["\u25AA"] before:absolute before:left-[-15px] before:text-heading before:w-0 py-1 break-words' : 'inline-block font-normal relative before:content-["-"] before:hidden xl:before:block before:absolute before:left-[-10px] before:text-default before:w-0 break-words'}`, "class")}> ${heading.value} </a> </div> </li>`)} ${isWeekly && headings.map((heading) => renderTemplate`<li class="xl:pl-4 pl-1"> <div class="text-default hover:text-secondary hover:font-bold"> <a${addAttribute(`#${heading.id}`, "href")} class="inline-block hover:text-secondary font-medium relative before:hidden xl:before:block before:content-[&quot;▪&quot;] before:absolute before:left-[-15px] before:text-heading before:w-0 py-2 break-words"> ${heading.value} </a> </div> </li>`)} </ul> </div> </div> </div> ${renderScript($$result, "/Users/yangxu/Astro/FatBlog/src/components/widgets/TOC.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/TOC.astro", undefined);

const $$BottomCardAds = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<aside aria-label="advertisement" role="complementary" id="card-advertisement"><div class="dynamic-ad-card"></div></aside>`;
}, "/Users/yangxu/Astro/FatBlog/src/components/widgets/BottomCardAds.astro", undefined);

export { $$CopyCodeSvg as $, $$BottomCardAds as a, $$CopyCodeButtonJS as b, $$Comment as c, $$TOC as d, $$SideBar as e };
