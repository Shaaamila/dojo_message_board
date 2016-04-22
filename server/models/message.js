var mongoose = require('mongoose');
var validate = require('mongoose-validator');
// var connection = mongo.createConnection('mongodb://127.0.0.1/test');
// // becomes
// var connection = mongo.connect('mongodb://127.0.0.1/test');

// var nameValidator = [
//   validate({
//     validator: 'isLength',
//     arguments: 4,
//     message: 'Name should be at least 4 characters'
//   })
// ]
var Schema = mongoose.Schema;
var messageSchema = new mongoose.Schema({
	name: String,
	// name: {type: String ,validate: nameValidator},
	text: String,
	comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]  //one to many relationship
});

//the object we are going to have many of has two properties: type and ref. The type property tells Mongoose
// the unique identifier for our association, which for us is the ObjectID of each comment. The ref property 
//tells Mongoose what model the unique identifier is associated with.  Long story short:
// Mongoose is just keeping an array full of associated comment IDs

var commentSchema = new mongoose.Schema({
	_message: {type: Schema.Types.ObjectId, ref: 'Message'},
//Now we must tell the comment model it belongs to a post model. When we are referencing a model that another
// model belongs to, we use an underscore ( _ ) to indicate this is another model. Note the small variation in 
//syntax in the type property.	
	name: String,
	text: String
});

messageSchema.path('name').required(true, 'Name field is required.');
messageSchema.path('text').required(true, 'Text field is required.');
commentSchema.path('name').required(true, 'Name field is required.');
commentSchema.path('text').required(true, 'Text field is required.');
mongoose.model('Message', messageSchema);
var Message = mongoose.model('Message');
mongoose.model('Comment', commentSchema);
var Comment = mongoose.model('Comment');