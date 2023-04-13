import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
serve((req) => {
  let url = req.url;
  let iSlash = url.indexOf('/',11);
  let nUrl = url.substring(iSlash+1);
  return await goUrl(req, nUrl);
});

async function goUrl(request, url) {
  let fp = {
    method: request.method,
    headers: {}
  }
  let reqHeaders = new Headers(request.headers);
  let dropHeaders = ["cookie","user-agent","accept","accept-language"];
  let he = reqHeaders.entries();
  for (let h of he) {
    let key = h[0],
        value = h[1];
    if (dropHeaders.includes(key)) {
      fp.headers[key] = value;
    }
  }
  return await fetch(url, fp);
}