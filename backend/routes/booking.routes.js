import express from 'express';
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  deleteBooking
} from '../controllers/booking.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/:eventId', createBooking);
router.get('/my-bookings', getUserBookings);
router.delete('/:id', deleteBooking);

router.use(restrictTo('admin'));
router.get('/', getAllBookings);

export default router;