import express from 'express';
import {
  signup,
  login,
  logout,
  updatePassword
} from '../controllers/auth.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);



router.use(protect);

router.patch('/updateMyPassword', updatePassword);



export default router;