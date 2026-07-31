
import {
    uploadPassengerDocumentService,
    updatePassengerDocumentService,
    getPassengerDocumentService,
} from "../services/passengerDocument.service.js";
import { successResponse } from "../utils/response.js";
import buildPassengerDocumentUploads from "../utils/buildPassengerDocumentUploads.js";


export const uploadPassengerDocument = async (
    req,
    res,
    next
) => {

    try {        

        const documentData =
            await buildPassengerDocumentUploads(
                req.files
            );

        const document =
            await uploadPassengerDocumentService(
                req.user.id,
                documentData
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


export const updatePassengerDocument = async (
    req,
    res,
    next
) => {
    try {

        const documentData = await buildPassengerDocumentUploads(req.files);

        const document = await updatePassengerDocumentService(
            req.user.id,
            documentData
        );

        return successResponse(
            res,
            200,
            "Passenger documents updated successfully.",
            document
        );

    } catch (error) {
        next(error);
    }
};