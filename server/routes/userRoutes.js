const { createUser, getUserById, getAllUsers, updateUser, deleteUser } = require('../controllers/userControllers')


const userRoutes = require('express').Router()


userRoutes.post('/createuser', createUser)
userRoutes.get('/getusers', getAllUsers)
userRoutes.get('/searchuser/:id', getUserById)
userRoutes.put('/updateuser/:id', updateUser)
userRoutes.delete('/deleteuser/:id', deleteUser)



module.exports = userRoutes