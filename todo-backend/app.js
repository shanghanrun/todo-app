const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
// index.js에서 router 모듈로 exports했지만 indexRouter로 받았다.
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/api', indexRouter) 
//라우터는 주소가 들어왔을 때, 해야할 행동을 정의한 것이다.

// const mongoURI = `mongodb://localhost:27017/todo-demo`
const mongoURI = process.env.MONGODB_URI
console.log('mongodbUri ==>', mongoURI)  // 잘 들어오나 반드시 확인!

mongoose.connect(mongoURI).then(()=>{console.log('mongoose connected')})
.catch((err)=>{
	console.log("DB connection fail", err)
})

app.listen(process.env.PORT || 5000, ()=>{
	console.log('server on 5000')
})

