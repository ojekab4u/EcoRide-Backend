import VehicleInspection from "../models/vehicleInspection.model.js";
import Vehicle from "../models/vehicle.model.js";
import DriverProfile from "../models/driver.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

export const getAllInspectionsForReviewService = async () => {

    return await VehicleInspection.findAll({
        include: [
            {
                model: Vehicle,
                include: [
                    {
                        model: DriverProfile,
                        include: [User],
                    },
                ],
            },
        ],
        order: [["createdAt", "DESC"]],
    });

};

export const getInspectionForReviewService = async (
    inspectionId
) => {

    const inspection =
        await VehicleInspection.findByPk(
            inspectionId,
            {
                include: [
                    {
                        model: Vehicle,
                        include: [
                            {
                                model: DriverProfile,
                                include: [User],
                            },
                        ],
                    },
                ],
            }
        );

    if (!inspection) {
        throw new AppError(
            "Inspection not found.",
            404
        );
    }

    return inspection;
};

export const reviewInspectionService = async (
    inspectionId,
    reviewData
) => {

    const inspection =
        await getInspectionForReviewService(
            inspectionId
        );

    inspection.inspectionStatus =
        reviewData.status;

    inspection.reviewNote =
        reviewData.reviewNote || null;

    inspection.reviewedAt = new Date();

    await inspection.save();

    return inspection;
};