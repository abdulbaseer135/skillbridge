import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { getMatches, completeMatch } from '../controllers/matchController.js'

const router = express.Router()

router.use(protect)
router.get('/', getMatches)
router.post('/:id/complete', completeMatch)

export default router
