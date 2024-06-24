const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env.defaults") });
require("dotenv").config({ path: path.join(__dirname, ".env"), override: true });
const Logger = require("@ailab/node-log");
const moduleAlias = require("module-alias");

const appConfig = require("./config/index.js");

moduleAlias.addAlias("app-config", __dirname + "/config/index.js");

global.log = Logger;
global.appConfig = appConfig;
