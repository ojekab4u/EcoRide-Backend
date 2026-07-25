import DriverProfile from "../models/driver.model.js";
import DriverDocument from "../models/driverDocument.model.js";
import AppError from "../utils/AppError.js";

export const uploadDriverDocumentsService = async (
    userId,
    documentData
) => {

    const driver = await DriverProfile.findOne({
        where: { userId },
    });

    if (!driver) {
        throw new AppError(
            "Create your driver profile first.",
            400
        );
    }

    const existingDocuments = await DriverDocument.findOne({
        where: {
            driverId: driver.id,
        },
    });

    if (existingDocuments) {
        throw new AppError(
            "Driver documents already uploaded.",
            400
        );
    }

    const documents = await DriverDocument.create({
        ...documentData,
        driverId: driver.id,
    });

    return documents;
};


export const getDriverDocumentsService = async (
    userId
) => {

    const driver = await DriverProfile.findOne({
        where: { userId },
    });

    if (!driver) {
        throw new AppError(
            "Driver profile not found.",
            404
        );
    }

    const documents = await DriverDocument.findOne({
        where: {
            driverId: driver.id,
        },
    });

    if (!documents) {
        throw new AppError(
            "Driver documents not found.",
            404
        );
    }

    return documents;
};


export const updateDriverDocumentsService = async (
    userId,
    documentData
) => {

    const documents = await getDriverDocumentsService(
        userId
    );

    // Drivers should not update verification fields
    delete documentData.verificationStatus;
    delete documentData.verifiedAt;
    delete documentData.verificationNote;

    await documents.update(documentData);

    return documents;
};