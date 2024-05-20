const Reply = require('../model/Reply')
const Task = require('../model/Task')
const replyController={} // 여러 함수를 가진 객체

replyController.createReply = async (req, res)=>{
	try{
		const {taskId, content} = req.body;  //bodyParser가 알아서 읽어 준다. 사실 클라이엔트에서 isDone:false로 자료 넘겨주어야 된다.
		const userId = req.userId
		console.log('taskId :', taskId)
		console.log('content :', content)
		console.log('userId :', userId)
		const newReply = new Reply({taskId, content, authorId: userId})
		await newReply.save()

		console.log('새 reply 저장됨:', newReply)

		// Task를 찾아서, replies 배열에 새로운 replyId 추가
		await Task.updateOne(
			{ _id: taskId },
			{ $push: { repliesId: newReply._id }}
		);

		const replyList = await Reply.find({taskId: taskId}).populate('taskId').populate('authorId')

		res.status(200).json({status:'ok', data: replyList})
	} catch(e){
		res.status(400).json({status:'fail', error:e})
	}
} 
replyController.getReplyList = async(req, res)=>{
	try{
		const id = req.params.id;
		const replyList = await Reply.find({taskId:id}).populate('authorId').populate('taskId')
		res.status(200).json({status:'ok',data:replyList})
	}catch(e){
		res.status(400).json({status:'fail', error:e})
	}
}
replyController.updateReply = async(req, res)=>{
	try{
		const id = req.params.id;
		const foundReply = await Reply.findOne({_id: id})
		console.log('찾은 리플라이 :', foundReply)

		await Reply.updateOne(
			{_id: id},
			{ $set: {content: req.body.content}},
		)
		const updatedReply = await Reply.findOne({_id:id})
		res.status(200).json({status:'ok', data: updatedReply})

		
	}catch(e){
		res.status(400).json({status:'fail', error:e})
	}
}
replyController.deleteReply = async(req, res)=>{
	try{
		const {id} = req.params;
		await Reply.deleteOne({_id: id})
		//혹은  await Reply.findByIdAndDelete({ _id: id });

		res.status(200).json({status:'ok', message: 'Reply deleted successfully'})
	}catch(e){
		res.status(400).json({status:'fail', error:e})
	}
}

module.exports = replyController