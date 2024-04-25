const express = require('express')
const router = express.Router()

const taskApi = require('./task.api')
//task.api.js에서 'router'를 module.exports했지만
// taskApi 이름으로 받았다.
// 결국 이것도 동일한 라우터이다.

router.use('/tasks', taskApi)

module.exports = router;