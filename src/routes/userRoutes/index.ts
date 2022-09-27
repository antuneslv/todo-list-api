import { Router } from 'express'
import { UserController } from '../../controllers'

const userRoutes = Router()

userRoutes.post('/signup', UserController.createUser)

userRoutes.post('/login', UserController.login)

userRoutes.get('/user', UserController.getUser)

userRoutes.put('/user/update', UserController.updateUser)

userRoutes.delete('/user/delete', UserController.deleteUser)

export default userRoutes
