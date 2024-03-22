import { Router } from 'express'
import { UpdateCases, createCases, deleteCases, getCases, getConsul } from '../controllers/case/indexControllers.mjs'



const router = Router()

router.get('/cases', getCases)
router.post('/cases', createCases)
router.get('/cases/:id', getConsul)
router.put('/cases/:id', UpdateCases)
router.delete('/cases/:id', deleteCases)

export default router