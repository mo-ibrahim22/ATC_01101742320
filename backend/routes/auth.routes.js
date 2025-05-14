import express from 'express';
import {
  signup,
  login,
  logout,
  protect,
  restrictTo,
  updatePassword
} from '../controllers/auth.controller.js';
import { isAdmin } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);



router.use(protect);

router.patch('/updateMyPassword', updatePassword);

router.use(restrictTo('admin'));

router.get('/admin', isAdmin, (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user
    }
  });
});

export default router;