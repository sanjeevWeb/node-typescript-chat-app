import express from 'express'

const router = express.Router()

import userController from '../controllers/userControllers'
import { auth } from '../middlewares/auth'

router.post('/signup' , userController.createUser)
router.post('/login' , userController.login)


export default router