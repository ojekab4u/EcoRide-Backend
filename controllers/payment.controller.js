import * as paymentService from '../services/payment.service.js';

export const initializePayment = async (req, res) => {
  try {
    const { amount, method } = req.body;
    const payment = await paymentService.initializePayment(req.user.id, amount, method);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const refundPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await paymentService.refundPayment(id);
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPaymentHistory = async (req, res) => {
  try {
    const history = await paymentService.getPaymentHistory(req.user.id);
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
