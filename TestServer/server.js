const express = require("express");
const app = express();
let routes = require('./routes.js')
routes(app);
app.listen(8888);
console.log("listening at port 8888 ...")