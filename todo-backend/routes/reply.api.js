const express = require('express')
const replyController = require('../controller/replyController')
const authController = require('../controller/authController')
const router = express.Router()

router.post('/', authController.authenticate, replyController.createReply)

router.get('/:id', replyController.getReplies)

router.put('/:id', replyController.updateReply)
router.delete('/:id', replyController.deleteReply)

module.exports = router;