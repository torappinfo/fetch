const http = require( 'http');
//node-fetch is ESM-only module
const fetch = (...args)=>import('node-fetch').then(({default: fetch})=>fetch(...args));
const server = http.createServer((req, res) => {
  let url = req.url;
  let iSlash = url.indexOf('?');
  let nUrl = url.substring(iSlash+1);
  console.log(nUrl);
  goUrl(req, nUrl).then(response => {
    res.writeHead(response.status, {'Content-Type': response.headers.get('content-type')});
    res.write(response.blob());
    res.end();
  });
});

const port = process.env.PORT || 80;
server.listen(port);

async function goUrl(request, url) {
  let fp = {
    method: request.method,
    headers: request.headers
  };
  return await fetch(url, fp);
}
