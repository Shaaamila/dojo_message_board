var mongoose = require('mongoose');
var Message = mongoose.model('Message');
var Comment = mongoose.model('Comment');
// var validate = require('mongoose-validator');
module.exports = {     //#1
	show: function(request, response) {
				// console.log(errors);		
		Message.find().populate('comments').exec(function(errors, messages) {
//The .populate() method basically tells your post model to gather the associated comments and 
//the .exec() method actually fires the action.
			response.render('index', {messages: messages});
		});
//// just an example route, your routes may look different

// app.get('/posts/:id', function (req, res){
// the populate method is what grabs all of the comments using their IDs stored in the 
// comment property array of the post document!
//  Post.findOne({_id: req.params.id})
//  .populate('comments')
//  .exec(function(err, post) {
//       res.render('post', {post: post});
//         });
// });
	},
	create: function(request, response) {
		// console.log("BOOs000");
		var message = new Message(request.body);
		message.save(function(errors) {   //saving in session?
			if (errors) {   //can't be err
				// console.log(err);
			response.render('index', {title: "You have an error in your new post", errors: message.errors});
				// response.redirect('/');
			} else {
				response.redirect('/');
			}
		});

	},
	createComment: function(request, response) {
// In order to add a comment to a preexisting post, we must update both parties
		Message.findById(request.params.id, function(errors, message) {
			var comment = new Comment(request.body);
        //  set the reference like this:
			comment._message = message._id;
			message.comments.push(comment);
        // now save both to the DB

        	message.save(function(errors){
			if(errors){
				response.render('index', {errors: message.errors});
			}else{
				comment.save(function(errors){
					if(errors){
						response.render('index', {errors: comment.errors});
					}else{
						response.redirect('/');
					}
				})
			}
		})
   //      		comment.save(function(errors) {
			// 	message.save(function(errors) {
			// 		if(errors) {
			// 			console.log(errors);
			//             response.render('index', {title: "You have an error in your new post", errors: comment.errors});
			// 			// console.log(errors);
			// 		} else {
			// 			response.redirect('/');
			// 		}
			// 	});
			// });
		}); }
	

}
