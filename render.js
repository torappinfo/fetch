const express = require("express");
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  let url = req.url;
  let iSlash = url.indexOf('/',11);
  let nUrl = url.substring(iSlash+1);
  let html = await goUrl(req, nUrl);
  res.send(html);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

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
