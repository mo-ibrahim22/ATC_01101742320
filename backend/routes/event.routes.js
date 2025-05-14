import express from 'express';
import {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventStats
} from '../controllers/event.controller.js';
import { optionalAuth, protect, restrictTo } from '../middlewares/auth.middleware.js';
import { upload } from '../config/cloudinary.js';

const router = express.Router();


router.use(optionalAuth);

router.get('/', getAllEvents);
router.get('/stats', getEventStats);
router.get('/:id', getEvent);

router.use(protect);

router.use(restrictTo('admin'));

router.post('/', upload.single('image'), createEvent);
router.patch('/:id', upload.single('image'), updateEvent);
router.delete('/:id', deleteEvent);

export default router;