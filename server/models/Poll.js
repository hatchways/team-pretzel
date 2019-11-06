import mongoose from "mongoose";

const pollSchema = new mongoose.Schema({
	//question,image,image,friendlist,user
	question: {
		type: String,
		required: true
	},
	image1: {
		type: String,
		required: true
	},
	image2: {
		type: String,
		required: true
	},
	friendList: {
		type: String,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
});

module.exports = Poll = mongoose.model("Poll", pollSchema);
