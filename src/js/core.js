
var fs = require('fs');
var path = require('path');

var allCfg = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));
var nodeEnv = process.env.NODE_ENV || 'development';
var cfg = allCfg[nodeEnv];

console.log(cfg); // Make eslint happy until we actually use cfg
