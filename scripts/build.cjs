const fs = require('fs');
const path = require('path');
const zeaburO = '.zeabur/output/functions/index.func';
if (!fs.existsSync(zeaburO)) {
  fs.mkdirSync(zeaburO);
}
fs.cpSync('package.json', '.zeabur/output/functions/index.func/package.json')
fs.cpSync('render.js', '.zeabur/output/functions/index.func/index.js')
