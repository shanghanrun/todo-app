const express = require('express')
const userController = require('../controller/user.controller')
const authController = require('../controller/authController')
const router = express.Router()

// 회원가입 endpoint  [프론트엔드에서 전한 데이터로 user를 만든다.]
router.post('/', userController.createUser)
router.post('/login', userController.loginWithEmail)
// 토큰에서 유저 id 빼내고, 그 아이디로 유저 객체 찾아서 보내주기
router.get('/me', authController.authenticate, userController.getUser)


module.exports = router