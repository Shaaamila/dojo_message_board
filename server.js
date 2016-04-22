var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var mongoose = require("mongoose");   ///#1

app.use(express.static(path.join(__dirname, "./client/static"))); /// 2 lines to set static n view 
app.use(bodyParser.urlencoded({extended: true}));
app.set("views", path.join(__dirname, "./client/views"));
app.set("view engine", "ejs");   ///#2

require('./server/config/mongoose.js');   //comment out in starting
										//#5  mongoose,models
var routes_setter = require('./server/config/routes.js');  
routes_setter(app);   ///#4   points to route

app.listen(8000, function() {
	console.log("The server is listening on port 8000");    ///#3
});