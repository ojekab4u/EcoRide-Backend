import CorporateProfile from "../models/corporateProfile.model.js";
import CorporateDocument from "../models/corporateDocument.model.js";
import AppError from "../utils/AppError.js";

export const uploadCorporateDocumentsService = async (
    userId,
    documentData
) => {

    const profile = await CorporateProfile.findOne({
        where: { userId },
    });

    if (!profile) {
        throw new AppError(
            "Corporate profile not found.",
            404
        );
    }

    const existing = await CorporateDocument.findOne({
        where: {
            corporateProfileId: profile.id,
        },
    });

    if (existing) {
        throw new AppError(
            "Corporate documents already uploaded.",
            409
        );
    }

    const document = await CorporateDocument.create({

        ...documentData,

        corporateProfileId: profile.id,

    });

    return document;
};

export const getCorporateDocumentsService = async (
    userId
) => {

    const profile =
        await CorporateProfile.findOne({
            where: { userId },
        });

    if (!profile) {

        throw new AppError(
            "Corporate profile not found.",
            404
        );

    }

    const document =
        await CorporateDocument.findOne({

            where: {
                corporateProfileId:
                    profile.id,
            },

        });

    if (!document) {

        throw new AppError(
            "Corporate documents not found.",
            404
        );

    }

    return document;

};

export const updateCorporateDocumentsService = async (
    userId,
    documentData
) => {

    const profile = await CorporateProfile.findOne({
        where: { userId },
    });

    if (!profile) {
        throw new AppError(
            "Corporate profile not found.",
            404
        );
    }

    const document = await CorporateDocument.findOne({
        where: {
            corporateProfileId: profile.id,
        },
    });

    if (!document) {
        throw new AppError(
            "Corporate documents not found.",
            404
        );
    }

    if (documentData.cacCertificate) {
        document.cacCertificate =
            documentData.cacCertificate;
    }

    if (documentData.taxCertificate) {
        document.taxCertificate =
            documentData.taxCertificate;
    }

    if (documentData.businessLicense) {
        document.businessLicense =
            documentData.businessLicense;
    }

    document.verificationStatus = "PENDING";
    document.rejectionReason = null;

    await document.save();

    return document;
};

