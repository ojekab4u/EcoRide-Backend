import {
    uploadDriverDocumentsService,
    getDriverDocumentsService,
    updateDriverDocumentsService,
} from "../services/driverDocument.service.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import buildDriverDocumentUploads from "../utils/buildDriverDocumentUploads.js";

import { successResponse } from "../utils/response.js";


export const uploadDriverDocuments = async (
    req,
    res,
    next
) => {
    try {

        const documentData =
            await buildDriverDocumentUploads(req.files);

        const documents =
            await uploadDriverDocumentsService(
                req.user.id,
                documentData
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

        const documentData =
            await buildDriverDocumentUploads(req.files);

        const documents =
            await updateDriverDocumentsService(
                req.user.id,
                documentData
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