const express = require('express')
const {handleGetAllUsers, handleCreateNewUser, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handlePutUserById} = require('../controllers/user')

const router = express.Router()

// Route -> /
router.route('/')
.get(handleGetAllUsers)
.post(handleCreateNewUser)

// Route -> /:id
router.route('/:id')
.get(handleGetUserById)  
.put(handlePutUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById)

module.exports = router