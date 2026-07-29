import { Router } from 'express';
import { paymentController, verifyPayment } from '../controllers/payment.controller.js';
import { ensureAuthenticated } from '../middlewares/Auth.js';


const router=Router()

router.post('/create-order', ensureAuthenticated, paymentController);
router.post('/verify',ensureAuthenticated, verifyPayment);
export default router;