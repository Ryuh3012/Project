import { Router } from 'express'
import { UpdateUser, createUser, deleteUser, getConsul, getUser } from '../controllers/user/indexControllers.mjs'

const router = Router()

router.get('/users', getUser)
router.post('/users', createUser)
router.get('/users/:cedula', getConsul)
router.put('/users/:cedula', UpdateUser)
router.delete('/users/:cedula', deleteUser)

export default router