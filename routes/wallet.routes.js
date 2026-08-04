import { Router } from 'express';
import { getBalance, deposit, withdraw } from '../controllers/wallet.controller.js';

const router = Router();

router.get('/balance', getBalance);
router.post('/deposit', deposit);
router.post('/withdraw', withdraw);

export default router;
