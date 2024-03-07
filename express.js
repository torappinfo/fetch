const express = require("express");
//node-fetch is ESM-only module
const fetch = (...args)=>import('node-fetch').then(({default: fetch})=>fetch(...args));
const app = express();
//const port = process.env.PORT || 80;

app.get("/", async (req, res) => {
  let url = req.url;
  let iSlash = url.indexOf('?');
  let nUrl = url.substring(iSlash+1);
  console.log(nUrl);
  let response = await goUrl(req, nUrl);
  res.status(response.status);
  res.set('Content-Type', response.headers.get('Content-Type'));
  res.send(await response.blob());
});

//app.listen(port, () => console.log(`Example app listening on port ${port}!`));

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
