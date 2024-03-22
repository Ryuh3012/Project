import { Router } from 'express'
import { getGender } from '../controllers/gender/gender.mjs'


const router = Router()

router.get('/gender', getGender)

export default router