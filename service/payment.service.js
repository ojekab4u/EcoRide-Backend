import Payment from '../models/payment.model.js';

export const initializePayment = async (userId, amount, method) => {
  const payment = new Payment({
    userId,
    amount,
    method,
    status: 'pending',
    createdAt: new Date()
  });
  return await payment.save();
};

export const refundPayment = async (paymentId) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) throw new Error('Payment not found');
  payment.status = 'refunded';
  return await payment.save();
};

export const getPaymentHistory = async (userId) => {
  return await Payment.find({ userId }).sort({ createdAt: -1 });
};
