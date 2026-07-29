import {
    uploadPassengerDocumentService,
    getPassengerDocumentService,
} from "../services/passengerDocument.service.js";

import { successResponse } from "../utils/response.js";

export const uploadPassengerDocument = async (
    req,
    res,
    next
) => {

    try {

        const document =
            await uploadPassengerDocumentService(
                req.user.id,
                req.body
            );

        return successResponse(
            res,
            200,
            "Passenger documents uploaded successfully.",
            document
        );

    } catch (error) {

        next(error);

    }

};

export const getPassengerDocument = async (
    req,
    res,
    next
) => {

    try {

        const document =
            await getPassengerDocumentService(
                req.user.id
            );

        return successResponse(
            res,
            200,
            "Passenger documents retrieved successfully.",
            document
        );

    } catch (error) {

        next(error);

    }

};