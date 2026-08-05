import {
    initializePaymentService,
    verifyPaymentService,
    getPaymentHistoryService,
    refundPaymentService,
} from "../services/payment.service.js";

import { successResponse } from "../utils/response.js";


export const initializePayment = async (
    req,
    res,
    next
) => {

    try {

        const payment =
            await initializePaymentService(
                req.user.id,
                req.body
            );

        return successResponse(
            res,
            201,
            "Payment initialized successfully.",
            payment
        );

    } catch (error) {

        next(error);

    }

};

export const mockPaymentCallback = async (
    req,
    res,
    next
) => {

    try {

        const payment =
            await verifyPaymentService(
                req.params.reference
            );

        return successResponse(
            res,
            200,
            "Mock payment callback processed successfully.",
            payment
        );

    } catch (error) {

        next(error);

    }

};

export const getPaymentHistory = async (
    req,
    res,
    next
) => {

    try {

        const payments =
            await getPaymentHistoryService(
                req.user.id
            );

        return successResponse(
            res,
            200,
            "Payment history retrieved successfully.",
            payments
        );

    } catch (error) {

        next(error);

    }

};

export const refundPayment = async (
    req,
    res,
    next
) => {

    try {

        const payment =
            await refundPaymentService(
                req.params.reference
            );

        return successResponse(
            res,
            200,
            "Payment refunded successfully.",
            payment
        );

    } catch (error) {

        next(error);

    }

};