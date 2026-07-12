import express from 'express'
import {
  getProfile,
  updateProfile,
  uploadAvatar,
  blockUser,
  unblockUser,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/profile', protect, getProfile)
router.patch('/profile', protect, updateProfile)
router.patch('/profile/avatar', protect, uploadAvatar)
router.post('/:userId/block', protect, blockUser)
router.delete('/:userId/block', protect, unblockUser)

export default router
