const http = require( 'http');
//node-fetch is ESM-only module
const fetch = (...args)=>import('node-fetch').then(({default: fetch})=>fetch(...args));
const server = http.createServer((req, res) => {
  let url = req.url;
  let iSlash = url.indexOf('?');
  let nUrl = url.substring(iSlash+1);
  goUrl(req, nUrl).then(response => {
    res.writeHead(response.status, {'Content-Type': response.headers.get('content-type')});
    res.write(response.blob());
    res.end();
  });
});

//const port = process.env.PORT || 80;
//server.listen(port);

async function goUrl(request, url) {
  const Url = new URL(url);
  const newReq = new Request(Url, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow'
  })
  return await fetch(newReq);
}
module.exports = server;
