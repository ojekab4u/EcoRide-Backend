import WalletTransaction from "../models/walletTransaction.model.js";

export const createWalletTransaction = async ({
    wallet,
    paymentId = null,
    amount,
    type,
    transactionType,
    description,
}) => {

    return WalletTransaction.create({
        walletId: wallet.id,
        userId: wallet.userId,
        paymentId,
        amount,
        type,
        transactionType,
        description,
    });

};