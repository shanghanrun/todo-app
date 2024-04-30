const mongoose = require('mongoose')
const {Schema} = mongoose

const replySchema = Schema(
	{
		itemId: {
			type:Schema.Types.ObjectId,
			required:true,
			ref:"Task"
		},
		content: {
			type:String,
			required: true,
		},
		author:{
			type:Schema.Types.ObjectId,
			required:true,
			ref:"User"
		}
	},
	{ timestamps: true}
)
replySchema.methods.toJSON = function(){
	const obj = this._doc
	delete obj.__v;
	return obj;
}

const Reply = mongoose.model("Reply", replySchema)

module.exports = Reply;
