const showComment = "1"


export function onRequest() {
  return new Response(showComment, {
    headers: {
      'content-type': 'text/html; charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

