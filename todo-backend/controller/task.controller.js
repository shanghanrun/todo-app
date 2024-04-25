const Task = require('../model/Task')
const taskController={} // 여러 함수를 가진 객체

taskController.createTask = async (req, res)=>{
	try{
		const {task, isDone} = req.body;  //bodyParser가 알아서 읽어 준다. 사실 클라이엔트에서 isDone:false로 자료 넘겨주어야 된다.
		const newTask = new Task({task, isDone})
		await newTask.save()
		res.status(200).json({status:'ok', data:newTask})
	} catch(e){
		res.status(400).json({status:'fail', error:e})
	}
}
taskController.getTasks = async(req, res)=>{
	try{
		const result = await Task.find().select({__v:0})
		// 이미 서버실행할 때 mongoose.connect('mongodb:/...) 했고,
		// Task = mongoose.model("Task", tasKSchema)해서 
		// Task는 해당 collection인 'tasks'를 가리키고 있다.
		// find() 해도 되고, 빈 filter 객체를 넣어도 된다. find({})
		res.status(200).json({status:'ok', data:result})
	}catch(e){
		res.status(400).json({status:'fail', error:e})
	}
}
taskController.updateTask = async(req, res)=>{
	try{
		const id = req.params.id;
		const foundTask = await Task.findOne({_id: id})
		console.log('찾은 테스크 :', foundTask)
		let updatedTask;

		if(req.body === undefined){  // req.body가 없는 요청을 하면 isDone을 바꾼다.
			await Task.updateOne(
				{_id: id},
				{ $set: {isDone: !foundTask.isDone}},
			)
			updatedTask = await Task.findOne({_id:id})
		} else if(req.body.task !==undefined){ // req.body에 task 값을 전달한 경우 task바꾼다.
			await Task.updateOne(
				{_id: id},
				{ $set: {task: req.body.task}},
			)
			updatedTask = await Task.findOne({_id:id})
		}
		res.status(200).json({status:'ok', data: updatedTask})

		// 혹은 다음과 같이 해도 된다.
		// const updatedTask = await Task.findOneAndUpdate(
        //     { _id: id },
        //     task === task ? { $set: { isDone: !isDone } } : { $set: { task: task } },
        //     { new: true } // 업데이트 후의 문서를 반환하도록 설정
		//                      만약 {new:true}를 적지 않으면, 업데이트 이전의 데이터를 반환한다.
        // );
        // res.status(200).json({ status: 'ok', data: updatedTask });
		
	}catch(e){
		res.status(400).json({status:'fail', error:e})
	}
}
taskController.deleteTask = async(req, res)=>{
	try{
		const {id} = req.params;
		await Task.deleteOne({_id: id})
		//혹은  await Task.findByIdAndDelete({ _id: id });

		res.status(200).json({status:'ok', message: 'Task deleted successfully'})
	}catch(e){
		res.status(400).json({status:'fail', error:e})
	}
}

module.exports = taskController