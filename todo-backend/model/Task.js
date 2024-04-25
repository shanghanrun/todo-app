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
		}
	},
	{ timestamps: true}
)

const Task = mongoose.model("Task", taskSchema)

module.exports = Task;
