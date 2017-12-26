const path = require("path")
const express = require("express")
module.exports = function (app) {
	app.use(express.static("./public"));
	app.use((req, res, next) => {
		if (true) {}
		next();
	})
	app.get("/api", (req, res) => {
		res.send({name:"zhangsan", age: 18});
	})
}