import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { getMessages, createMessage } from '../controllers/messageController.js'

const router = express.Router()

router.use(protect)
router.get('/:id/messages', getMessages)
router.post('/:id/messages', createMessage)

export default router
