const express = require('express')
const taskController = require('../controller/taskController')
const authController = require('../controller/authController')
const taskRouter = express.Router()

taskRouter.post('/', authController.authenticate, taskController.createTask)

taskRouter.get('/', taskController.getTasks)

taskRouter.put('/:id', authController.authenticate,taskController.updateTask)
taskRouter.delete('/:id', authController.authenticate,taskController.deleteTask)

module.exports = taskRouter;