import * as walletService from '../services/wallet.service.js';

export const getBalance = async (req, res) => {
  try {
    const balance = await walletService.getBalance(req.user.id);
    res.json({ balance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deposit = async (req, res) => {
  try {
    const { amount } = req.body;
    const wallet = await walletService.deposit(req.user.id, amount);
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const withdraw = async (req, res) => {
  try {
    const { amount } = req.body;
    const wallet = await walletService.withdraw(req.user.id, amount);
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
