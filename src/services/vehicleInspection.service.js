import DriverProfile from "../models/driver.model.js";
import Vehicle from "../models/vehicle.model.js";
import VehicleInspection from "../models/vehicleInspection.model.js";
import AppError from "../utils/AppError.js";

export const createVehicleInspectionService = async (
    userId,
    inspectionData
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

    const vehicle = await Vehicle.findOne({
        where: {
            driverId: driver.id,
            isActive: true,
        },
    });

    if (!vehicle) {
        throw new AppError(
            "Vehicle not found.",
            404
        );
    }

    const existingInspection =
        await VehicleInspection.findOne({
            where: {
                vehicleId: vehicle.id,
            },
        });

    if (existingInspection) {
        throw new AppError(
            "Vehicle inspection already exists.",
            400
        );
    }

    return await VehicleInspection.create({
        ...inspectionData,
        vehicleId: vehicle.id,
    });

};

export const getVehicleInspectionService = async (
    userId
) => {

    const driver = await DriverProfile.findOne({
        where: { userId },
    });

    const vehicle = await Vehicle.findOne({
        where: {
            driverId: driver.id,
            isActive: true,
        },
    });

    const inspection =
        await VehicleInspection.findOne({
            where: {
                vehicleId: vehicle.id,
            },
        });

    if (!inspection) {
        throw new AppError(
            "Vehicle inspection not found.",
            404
        );
    }

    return inspection;

};

export const updateVehicleInspectionService = async (
    userId,
    inspectionData
) => {

    const inspection =
        await getVehicleInspectionService(
            userId
        );

    delete inspectionData.inspectionStatus;
    delete inspectionData.reviewNote;
    delete inspectionData.reviewedAt;

    await inspection.update(inspectionData);

    return inspection;

};

