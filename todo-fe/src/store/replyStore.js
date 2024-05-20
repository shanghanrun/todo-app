import {create} from 'zustand'
import api from '../utils/api'

const replyStore = create((set,get)=>({
	reply:{},
	replyAuthor:'',
	replyUpdated:false,
	createReply: async (taskId,content)=>{
		try{
			const resp = await api.post('/reply',{taskId, content})
			if(resp.status !== 200) throw new Error(resp.error)
			set((state)=>({
				replyUpdated: !state.replyUpdated
			}))
		}catch(e){
			console.log(e.message)
		}
	},
	// getReplyList:async(taskId)=>{
	// 	try{
			
	// 	}catch(e){

	// 	}
	// },
	getReplyAuthor: async(replyId)=>{
		try{
			const resp = await api.get(`/reply/author/${replyId}`)
			if(resp.status !==200) throw new Error(resp.error)
			set({replyAuthor: resp.data.data})
			set((state)=>({replyUpdated:!state.replyUpdated}))
		}catch(e){
			console.log(e.message)
		}
	},
	getReply: async(replyId) =>{
		try{
			const resp = await api.get(`/reply/${replyId}`)
			if(resp.status !==200) throw new Error(resp.error)
			set((state)=>({
				reply: resp.data.data,
				replyUpdated: !state.replyUpdated
			}))
		}catch(e){
			console.log(e.message)
		}
	},
	updateReply: async(replyId, content)=>{
		try{
			const resp = await api.put('/reply/replyId',{content})
			if(resp.status !== 200) throw new Error(resp.error)
			set((state)=>({
				replyUpdated: !state.replyUpdated
			}))
		}catch(e){
			console.log(e.message)
		}
	},
	deleteReply: async(replyId) =>{
		try{
			const resp = await api.delete('/reply/replyId')
			if(resp.status !== 200) throw new Error(resp.error)
			set((state)=>({
				replyUpdated: !state.replyUpdated
			}))
		}catch(e){
			console.log(e.message)
		}
	}
}))

export default replyStore;