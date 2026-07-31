import PassengerProfile from "../models/passengerProfile.model.js";
import PassengerDocument from "../models/passengerDocument.model.js";
import AppError from "../utils/AppError.js";


// ===============================
// Upload Passenger Documents
// ===============================
export const uploadPassengerDocumentService = async (
    userId,
    documentData
) => {

    const passenger = await PassengerProfile.findOne({
        where: { userId },
    });

    if (!passenger) {
        throw new AppError(
            "Passenger profile not found.",
            404
        );
    }

    const existingDocument =
        await PassengerDocument.findOne({
            where: {
                passengerProfileId: passenger.id,
            },
        });

    if (existingDocument) {
        throw new AppError(
            "Passenger documents already uploaded.",
            400
        );
    }

    return await PassengerDocument.create({
        passengerProfileId: passenger.id,
        ...documentData,
    });
};


// ===============================
// Update Passenger Documents
// ===============================
export const updatePassengerDocumentService = async (
    userId,
    documentData
) => {

    const passenger = await PassengerProfile.findOne({
        where: { userId },
    });

    if (!passenger) {
        throw new AppError(
            "Passenger profile not found.",
            404
        );
    }

    const document =
        await PassengerDocument.findOne({
            where: {
                passengerProfileId: passenger.id,
            },
        });

    if (!document) {
        throw new AppError(
            "Passenger document not found.",
            404
        );
    }

    await document.update(documentData);

    return document;
};


// ===============================
// Get Passenger Documents
// ===============================
export const getPassengerDocumentService = async (
    userId
) => {

    const passenger = await PassengerProfile.findOne({
        where: { userId },
    });

    if (!passenger) {
        throw new AppError(
            "Passenger profile not found.",
            404
        );
    }

    const document =
        await PassengerDocument.findOne({
            where: {
                passengerProfileId: passenger.id,
            },
        });

    if (!document) {
        throw new AppError(
            "Passenger document not found.",
            404
        );
    }

    return document;
};