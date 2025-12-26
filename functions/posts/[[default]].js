// 对应的 URL: /posts/xxx/ -> /zh/posts/xxx/ ，这里的 xxx 是文章的 ID，转小写
export function onRequest({ request }) {
  // 从 request 中获取用户的目标 URL
  const targetUrl = request.url;

  // 从 targetUrl 中提起 /posts/ 后的路径
  const post = targetUrl.split('/posts/')[1];
  // 从 post 中提取出文章的 ID（如果有 / 则 / 之前的内容，如果没有去除后面的参数）
  const postId = post.includes('/') ? post.split('/')[0] : post.split('?')[0];
  // postID 转小写
  const postIdLower = postId.toLowerCase();

  // 进行 redirect, 重定向到对应的文章
  return Response.redirect(`/zh/posts/${postIdLower}/`, 301);
}
