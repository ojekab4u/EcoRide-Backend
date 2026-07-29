import PassengerProfile from "../models/passengerProfile.model.js";
import PassengerDocument from "../models/passengerDocument.model.js";
import AppError from "../utils/AppError.js";

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

    let document = await PassengerDocument.findOne({
        where: {
            passengerProfileId: passenger.id,
        },
    });

    if (document) {

        await document.update(documentData);

        return document;

    }

    document = await PassengerDocument.create({
        passengerProfileId: passenger.id,
        ...documentData,
    });

    return document;
};

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

    const document = await PassengerDocument.findOne({
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