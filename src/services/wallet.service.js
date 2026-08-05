import Wallet from "../models/wallet.model.js";
import Payment from "../models/payment.model.js";
import AppError from "../utils/AppError.js";

export const getWalletService = async (
    userId
) => {

    let wallet = await Wallet.findOne({
        where: {
            userId,
        },
    });

    if (!wallet) {

        wallet = await Wallet.create({
            userId,
            balance: 0,
        });

    }

    return wallet;

};


export const getWalletTransactionsService = async (
    userId
) => {

    const payments = await Payment.findAll({

        where: {
            userId,
        },

        order: [
            ["createdAt", "DESC"],
        ],

    });

    return payments;

};


export const creditWallet = async (
   userId,
    amount,
    options = {}
) => {

   const { transaction } = options;

    const wallet = await Wallet.findOne({
        where: { userId },
        transaction,
    });

    if (!wallet) {
        wallet = await Wallet.create({
            userId,
            balance: 0,
        });
    }

    wallet.balance =
        Number(wallet.balance) +
        Number(amount);

    await wallet.save({ transaction });

   
    return wallet;
};

export const debitWallet = async (
     userId,
    amount,
    options = {}
) => {

     const { transaction } = options;

    let wallet = await Wallet.findOne({
        where: { userId },
        transaction,
    });

    if (!wallet) {
        throw new AppError(
            "Wallet not found.",
            404
        );
    }

    if (Number(wallet.balance) < Number(amount)) {
        throw new AppError(
            "Insufficient wallet balance.",
            400
        );
    }

    wallet.balance =
        Number(wallet.balance) -
        Number(amount);
    
    await wallet.save({ transaction });

    return wallet;
}