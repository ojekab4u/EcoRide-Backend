import {
    uploadDriverDocumentsService,
    getDriverDocumentsService,
    updateDriverDocumentsService,
} from "../services/driverDocument.service.js";

import { successResponse } from "../utils/response.js";

export const uploadDriverDocuments = async (
    req,
    res,
    next
) => {
    try {

        const documents =
            await uploadDriverDocumentsService(
                req.user.id,
                req.body
            );

        return successResponse(
            res,
            201,
            "Driver documents uploaded successfully.",
            documents
        );

    } catch (error) {

        next(error);

    }
};

export const getDriverDocuments = async (
    req,
    res,
    next
) => {
    try {

        const documents =
            await getDriverDocumentsService(
                req.user.id
            );

        return successResponse(
            res,
            200,
            "Driver documents retrieved successfully.",
            documents
        );

    } catch (error) {

        next(error);

    }
};

export const updateDriverDocuments = async (
    req,
    res,
    next
) => {
    try {

        const documents =
            await updateDriverDocumentsService(
                req.user.id,
                req.body
            );

        return successResponse(
            res,
            200,
            "Driver documents updated successfully.",
            documents
        );

    } catch (error) {

        next(error);

    }
};