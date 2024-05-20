const express = require('express')
const replyController = require('../controller/replyController')
const authController = require('../controller/authController')
const replyRouter = express.Router()

replyRouter.post('/', authController.authenticate, replyController.createReply)

replyRouter.get('/:id', replyController.getReplyList)

replyRouter.put('/:id', authController.authenticate,replyController.updateReply)
replyRouter.delete('/:id', authController.authenticate,replyController.deleteReply)

module.exports = replyRouter;