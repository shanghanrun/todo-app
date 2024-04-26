const User = require('../model/User')
const bcrypt = require('bcrypt')
const saltRounds =10

const userController={}

userController.createUser = async(req, res)=>{
	try{
		const {username, email, password} = req.body;
		const user = await User.findOne({email})
		if(user){
			throw new Error('이미 가입된 유저입니다.')
		}

		const hash = bcrypt.hashSync(password, saltRounds)
		console.log('hash : ', hash)
		const newUser = new User({username,email,password: hash})
		await newUser.save()
		// 위 두줄 코드 대신에 다음과 같이 할 수 있다..
		// const newUser = await User.create({username,email,password})
		
		return res.status(200).json({status:'ok', data:newUser})
	}catch(e){
		return res.status(400).json({status:'fail', error:e})
	}
}

module.exports = userController;