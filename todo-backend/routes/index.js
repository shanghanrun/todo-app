const express = require('express')
const router = express.Router()

const taskApi = require('./task.api')
//task.api.js에서 'router'를 module.exports했지만
// taskApi 이름으로 받았다.
// 결국 이것도 동일한 라우터이다.
const userApi = require('./user.api')
const replyApi = require('./reply.api')

router.use('/tasks', taskApi)
router.use('/user', userApi)
router.use('/reply', replyApi)

module.exports = router;