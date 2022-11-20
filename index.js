var http = require('http');
const fetch = require('node-fetch');
http.createServer(function (req, res) {
  var url = req.url.substring(1);
  console.log(`request at ${url}!`)
  fetch(url).then(res => res.text())
    .then(text => {res.write(text);res.end();});
}).listen(process.env.PORT || 8080);
