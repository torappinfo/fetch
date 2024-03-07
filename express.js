const express = require("express");
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 80;

app.get("/", async (req, res) => {
  let url = req.url;
  let iSlash = url.indexOf('?',11);
  let nUrl = url.substring(iSlash+1);
  let response = await goUrl(req, nUrl);
  res.status(response.status);
  res.set('Content-Type', response.headers.get('Content-Type'));
  res.send(await response.blob());
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

async function goUrl(request, url) {
  let fp = {
    method: request.method,
  };
  fp.headers = new Headers(request.headers);
  for(var i = 2; i < arguments.length-1; i=i+2){
    fp.headers[arguments[i]] = arguments[i+1];
  }
  return await fetch(url, fp);
}
module.exports = app;
