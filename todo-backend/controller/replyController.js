const Reply = require('../model/Reply')
const replyController={} // 여러 함수를 가진 객체

replyController.createReply = async (req, res)=>{
	try{
		const {itemId, content } = req.body;  //bodyParser가 알아서 읽어 준다. 사실 클라이엔트에서 isDone:false로 자료 넘겨주어야 된다.
		const userId = req.userId
		const newReply = new Reply({itemId, content, author: userId})
		await newReply.save()
		res.status(200).json({status:'ok', data:newReply})
	} catch(e){
		res.status(400).json({status:'fail', error:e})
	}
} 
replyController.getReplies = async(req, res)=>{
	try{
		const id = req.params.id;
		const replyList = await Reply.find({itemId:id}).populate('author')
		res.status(200).json({status:'ok', data:replyList})
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