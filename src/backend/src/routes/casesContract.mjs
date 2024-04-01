import { Router } from 'express'
import { createCaseContract, deleteCaseContract, getCaseContract, getConsul, UpdateCaseContract } from '../controllers/caseContract/caseContract.mjs'


const router = Router()


router.post('/cases', createCaseContract)
router.get('/cases', getCaseContract)
router.get('/cases/:cedula', getConsul)
router.delete('/cases/:cedula', deleteCaseContract)
router.put('/cases/:cedula', UpdateCaseContract)

export default router