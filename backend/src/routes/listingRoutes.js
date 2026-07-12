import express from 'express'
import {
  createListing,
  getListings,
  getListing,
  updateListing,
  deleteListing,
  getMyListings,
  searchListings,
} from '../controllers/listingController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getListings).post(protect, createListing)
router.get('/me', protect, getMyListings)
router.get('/search', searchListings)
router.route('/:id').get(getListing).patch(protect, updateListing).delete(protect, deleteListing)

export default router
