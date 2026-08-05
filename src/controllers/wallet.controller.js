import {
    getWalletService,
    getWalletTransactionsService,
} from "../services/wallet.service.js";

import { successResponse } from "../utils/response.js";


export const getWallet = async (
    req,
    res,
    next
) => {

    try {

        const wallet =
            await getWalletService(
                req.user.id
            );

        return successResponse(
            res,
            200,
            "Wallet retrieved successfully.",
            wallet
        );

    } catch (error) {

        next(error);

    }

};

export const getWalletTransactions = async (
    req,
    res,
    next
) => {

    try {

        const transactions =
            await getWalletTransactionsService(
                req.user.id
            );

        return successResponse(
            res,
            200,
            "Wallet transactions retrieved successfully.",
            transactions
        );

    } catch (error) {

        next(error);

    }

};