const Reply = require('../model/Reply')
const Task = require('../model/Task')
const User = require('../model/User')
const replyController={} // 여러 함수를 가진 객체

replyController.createReply = async (req, res)=>{
	try{
		const {taskId, content} = req.body;  //bodyParser가 알아서 읽어 준다. 사실 클라이엔트에서 isDone:false로 자료 넘겨주어야 된다.
		const userId = req.userId
		console.log('taskId :', taskId)
		console.log('content :', content)
		console.log('userId :', userId)
		const newReply = new Reply({content, authorId: userId})
		await newReply.save()

		console.log('새 reply 저장됨:', newReply)

		// Task를 찾아서, replies 배열에 새로운 replyId 추가
		await Task.updateOne(
			{ _id: taskId },
			{ $push: { replyIds: newReply._id }}
		);

		// const replyList = await Reply.find({taskId: taskId}).populate('taskId').populate('authorId')

		res.status(200).json({status:'ok', data: ''})
	} catch(e){
		res.status(400).json({status:'fail', error:e})
	}
} 
replyController.getReplyAuthor = async(req, res)=>{
	try{
		const replyId = req.params.id // replyId
		const foundReply = await Reply.findOne({_id:replyId})
		const authorId = foundReply.authorId
		const foundUser = await User.findOne({_id: authorId})
		const authorName = foundUser.username
		console.log("찾은 reply저자 :", authorName)
		if(!foundReply || !foundUser) throw new Error('reply 유저를 찾지 못했습니다.')
		res.status(200).json({status:'ok', data:authorName})
	}catch(e){
		res.status(400).json({status:'fail', error:e})
	}
}
replyController.getReply = async(req, res)=>{
	console.log('getReply 시작됨')
	try{
		const replyId = req.params.id // replyId
		console.log('replyId', replyId)
		const foundReply = await Reply.findOne({_id: replyId}).populate('authorId')
		if(!foundReply) throw new Error('해당 reply를 찾지 못했습니다.')
		res.status(200).json({status:'ok', data: foundReply})
	}catch(e){
		res.status(400).json({status:'fail', error:e})
	}
}
// replyController.getReplyList = async(req, res)=>{
// 	try{
// 		const id = req.params.id;  // taskId
// 		const replyList = await Reply.find({taskId:id}).populate('authorId').populate('taskId')
// 		res.status(200).json({status:'ok',data:replyList})
// 	}catch(e){
// 		res.status(400).json({status:'fail', error:e})
// 	}
// }
replyController.updateReply = async(req, res)=>{
	try{
		const id = req.params.id;  //replyId
		const {content} = req.body;

		const foundReply = await Reply.findOne({_id: id})
		console.log('찾은 리플라이 :', foundReply)

		await Reply.updateOne(
			{_id: id},
			{ $set: {content: content}},
		)
		// const replyList = await Reply.find({taskId:id}).populate('authorId').populate('taskId')
		res.status(200).json({status:'ok',data:''})
	}catch(e){
		res.status(400).json({status:'fail', error:e})
	}
}
replyController.deleteReply = async(req, res)=>{
	try{
		const {id} = req.params;
		// const {taskId} = req.body;
		await Reply.deleteOne({_id: id})
		//혹은  await Reply.findByIdAndDelete({ _id: id });

		// const replyList = await Reply.find({taskId:id}).populate('authorId').populate('taskId')
		res.status(200).json({status:'ok',data:''})
	}catch(e){
		res.status(400).json({status:'fail', error:e})
	}
}

module.exports = replyController