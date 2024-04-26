const express = require('express')
const userController = require('../controller/user.controller')
const router = express.Router()

// 회원가입 endpoint  [프론트엔드에서 전한 데이터로 user를 만든다.]
router.post('/', userController.createUser)
router.post('/login', userController.loginWithEmail)


module.exports = router