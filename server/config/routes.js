// var mongoose = require('mongoose'); nope...still check
// var Message = mongoose.model('Message');  //needed? no. sure
// var Comment = mongoose.model('Comment');  //needed?
var messages = require('../controllers/messages.js');

module.exports = function Route(app){
	app.get("/", function(request, response){
		messages.show(request, response);
		// response.render("index"); 
		// response.send("ok");
	}),
		app.post('/messages', function(request, response) {
		messages.create(request, response);
	}),	
		app.post('/messages/:id/comment', function(req, res) {
		messages.createComment(req, res);
	})


}
