// redirect 到 /zh/posts/
export function onRequest() { 
    return Response.redirect(`/zh/posts/`, 301);
}