const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = Schema(
	{
		task: {
			type:String,
			required: true,
		},
		isDone:{
			type:Boolean,
			default: false,
		},
		authorId:{
			type:Schema.Types.ObjectId,
			required:true,
			ref:"User"
		},
		repliesId:[
			{ type:Schema.Types.ObjectId,
				ref:"Reply"
			}
		]
	},
	{ timestamps: true}
)
taskSchema.methods.toJSON = function(){
	const obj = this._doc
	delete obj.__v;
	return obj;
}

const Task = mongoose.model("Task", taskSchema)

module.exports = Task;
