import Wallet from '../models/wallet.model.js';

export const getBalance = async (userId) => {
  const wallet = await Wallet.findOne({ userId });
  if (!wallet) throw new Error('Wallet not found');
  return wallet.balance;
};

export const deposit = async (userId, amount) => {
  const wallet = await Wallet.findOneAndUpdate(
    { userId },
    { $inc: { balance: amount } },
    { new: true, upsert: true }
  );
  return wallet;
};

export const withdraw = async (userId, amount) => {
  const wallet = await Wallet.findOne({ userId });
  if (!wallet || wallet.balance < amount) throw new Error('Insufficient funds');
  wallet.balance -= amount;
  return await wallet.save();
};
