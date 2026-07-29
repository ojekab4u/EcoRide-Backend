import Vehicle from "../models/vehicle.model.js";
import AppError from "../utils/AppError.js";
import DriverProfile from "../models/driver.model.js";
import VehicleInspection from "../models/vehicleInspection.model.js";

export const reviewVehicleService = async (
    vehicleId,
    reviewData
) => {

    const vehicle = await Vehicle.findByPk(vehicleId);

    if (!vehicle) {
        throw new AppError(
            "Vehicle not found.",
            404
        );
    }

    const {
        status,
        rejectionReason,
    } = reviewData;

    await vehicle.update({
        verificationStatus: status,
        rejectionReason:
            status === "REJECTED"
                ? rejectionReason
                : null,
    });

    return vehicle;
};

export const getAllVehiclesForReviewService = async () => {

    return await Vehicle.findAll({
         include: [
        DriverProfile,
        VehicleInspection,
    ],
        order: [["createdAt", "DESC"]],
    });

};

export const getVehicleForReviewService = async (
    vehicleId
) => {

    const vehicle = await Vehicle.findByPk(
        vehicleId,
        {
            include: [
                DriverProfile,
                VehicleInspection,
            ],
        }
    );

    if (!vehicle) {
        throw new AppError(
            "Vehicle not found.",
            404
        );
    }

    return vehicle;

};