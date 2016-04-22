var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

//manually create it in server
//create funnction just checks if db is there-Jimmy
mongoose.connect("mongodb://localhost/myfirstdb");   ///database
var models_path = path.join(__dirname, './../models');

fs.readdirSync(models_path).forEach(function(file) {
	if (file.indexOf('.js') >= 0) {
		require(models_path + '/' + file);
	}
})