import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
serve((req) => {
  let reqHeaders = new Headers(req.headers);
  let fp = {
    method: req.method,
    headers: {}
  }

  let he = reqHeaders.entries();
  for (let h of he) {
    const key = h[0];
    if( 'user-agent' == key)
      fp.headers[key] = h[1];
    else if( 'cookie1' == key)
      fp.headers['Cookie'] = h[1];
  }
  return await fetch('https://www.bing.com/turing/conversation/create', fp);

});
