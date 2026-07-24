import { Router } from 'express';
import { paymentController, verifyPayment } from '../controllers/payment.controller.js';


const router=Router()

router.post('/create-order', paymentController);
router.post('/verify', verifyPayment);
export default router;