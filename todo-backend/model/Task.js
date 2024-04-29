const mongoose = require('mongoose')
const {Schema} = mongoose

const taskSchema = Schema(
	{
		task: {
			type:String,
			required: true,
		},
		isDone:{
			type:Boolean,
			required:true
		},
		author:{
			type:Schema.Types.ObjectId,
			required:true,
			ref:"User"
		}
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
