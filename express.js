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
  const Url = new URL(url);
  const newReq = new Request(Url, {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow'
  })
  return await fetch(newReq);
}
module.exports = app;
