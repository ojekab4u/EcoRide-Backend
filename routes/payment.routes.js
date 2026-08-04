import { Router } from 'express';
import { initializePayment, refundPayment, getPaymentHistory } from '../controllers/payment.controller.js';

const router = Router();

router.post('/init', initializePayment);
router.post('/refund/:id', refundPayment);
router.get('/history', getPaymentHistory);

export default router;
