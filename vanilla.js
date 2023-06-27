const http = require('http');
const server = http.createServer((req, res) => {
  let url = req.url;
  let iSlash = url.indexOf('?',11);
  let nUrl = url.substring(iSlash+1);
  goUrl(req, nUrl).then(response => {
    res.writeHead(response.status, {'Content-Type': response.headers.get('content-type')});
    res.write(response.text());
    res.end();
  });
});

const port = process.env.PORT || 8080;
server.listen(port);

async function goUrl(request, url) {
  let fp = {
    method: request.method,
    headers: {}
  };
  fp.headers = new Headers(request.headers);
  for(var i = 2; i < arguments.length-1; i=i+2){
    fp.headers[arguments[i]] = arguments[i+1];
  }
  return await fetch(url, fp);
}
