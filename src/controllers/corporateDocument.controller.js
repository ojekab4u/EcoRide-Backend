import {
    uploadCorporateDocumentsService,
    getCorporateDocumentsService,
    updateCorporateDocumentsService,
} from "../services/corporateDocument.service.js";

import buildCorporateDocumentUploads
from "../utils/buildCorporateDocumentUploads.js";

import { successResponse }
from "../utils/response.js";

export const uploadCorporateDocuments = async (
    req, res, next) => {
    try {
        const documentData =
        await buildCorporateDocumentUploads(
            req.files
        );
        
        const documents =
            await uploadCorporateDocumentsService(
                req.user.id,
                documentData
            );

        return successResponse(
            res,
            201,
            "Corporate documents uploaded successfully.",
            documents
        );

    } catch (error) {

        next(error);

    }

};

export const getCorporateDocuments = async (
    req,
    res,
    next
) => {

    try {

        const documents =
            await getCorporateDocumentsService(
                req.user.id
            );

        return successResponse(
            res,
            200,
            "Corporate documents retrieved successfully.",
            documents
        );

    } catch (error) {

        next(error);

    }

};

export const updateCorporateDocuments = async (
    req,
    res,
    next
) => {

    try {

        const documentData =
            await buildCorporateDocumentUploads(
                req.files
            );

        const documents =
            await updateCorporateDocumentsService(
                req.user.id,
                documentData
            );

        return successResponse(
            res,
            200,
            "Corporate documents updated successfully.",
            documents
        );

    } catch (error) {

        next(error);

    }

};
