import Payment from "../models/payment.model.js";
import AppError from "../utils/AppError.js";
import generatePaymentReference from "../utils/generatePaymentReference.js";
import { createNotification } from "./notification.service.js";
import { creditWallet } from "./wallet.service.js";
import {createWalletTransaction } from "../utils/createWalletTransaction.js"


export const initializePaymentService = async (
    userId,
    paymentData
) => {

    const {
        amount,
        paymentMethod,
        paymentType,
    } = paymentData;

    if (amount <= 0) {

        throw new AppError(
            "Amount must be greater than zero.",
            400
        );

    }

    const payment =
        await Payment.create({
            userId,
            amount,
            paymentMethod,
            paymentType,
            paymentStatus: "PENDING",
            reference:
                generatePaymentReference(),

        });

        await createNotification({
        userId,
        title: "Payment Initiated",
        message: `Your payment of ₦${amount} has been initiated.`,
        type: "PAYMENT",
        referenceId: payment.id,
    });

    return payment;

};

export const verifyPaymentService = async (
    reference
) => {

    const payment = await Payment.findOne({
        where: { reference },
    });

    if (!payment) {
        throw new AppError(
            "Payment not found.",
            404
        );
    }

    if (payment.paymentStatus === "SUCCESS") {
        throw new AppError(
            "Payment already verified.",
            400
        );
    }

    payment.paymentStatus = "SUCCESS";

    await payment.save();

    const wallet = await creditWallet(
        payment.userId,
        payment.amount,
         {
        paymentId: payment.id,
        type: "TOP_UP",
        description: "Wallet funded successfully",
    }
    );

    await createNotification({
        userId: payment.userId,
        title: "Payment Successful",
        message: `₦${payment.amount} has been added to your wallet.`,
        type: "PAYMENT",
        referenceId: payment.id,
    });

    return {
        payment,
        wallet,
    };

};

export const getPaymentHistoryService = async (
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

export const refundPaymentService = async (
    reference
) => {

    const payment = await Payment.findOne({
        where: { reference },
    });

    if (!payment) {
        throw new AppError(
            "Payment not found.",
            404
        );
    }

    if (payment.paymentStatus === "REFUNDED") {
        throw new AppError(
            "Payment has already been refunded.",
            400
        );
    }

    if (payment.paymentStatus !== "SUCCESS") {
        throw new AppError(
            "Only successful payments can be refunded.",
            400
        );
    }

    payment.paymentStatus = "REFUNDED";
    await payment.save();

    const wallet = await creditWallet(
        payment.userId,
        payment.amount,
        {
            paymentId: payment.id,
            type: "REFUND",
            description: `Refund for payment ${payment.reference}`,
        }
    );

    await createNotification({
        userId: payment.userId,
        title: "Refund Successful",
        message: `₦${payment.amount} has been refunded to your wallet.`,
        type: "PAYMENT",
        referenceId: payment.id,
    });

    return {
        payment,
        wallet,
    };
};