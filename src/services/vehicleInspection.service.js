import DriverProfile from "../models/driver.model.js";
import Vehicle from "../models/vehicle.model.js";
import VehicleInspection from "../models/vehicleInspection.model.js";
import AppError from "../utils/AppError.js";

export const createVehicleInspectionService = async (
    userId,
    vehicleId,
    files
) => {

    // Check driver profile
    const driver = await DriverProfile.findOne({
        where: { userId },
    });

    if (!driver) {
        throw new AppError(
            "Driver profile not found.",
            404
        );
    }

    // Check vehicle
    const vehicle = await Vehicle.findOne({
        where: {
            id: vehicleId,
            driverId: driver.id,
        },
    });

    if (!vehicle) {
        throw new AppError(
            "Vehicle not found.",
            404
        );
    }

    // Prevent duplicate inspection
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

    // Ensure all required photos exist
    const requiredPhotos = [
        "frontPhoto",
        "rearPhoto",
        "dashboardPhoto",
        "odometerPhoto",
        "tyrePhoto",
        "safetyEquipmentPhoto",
    ];

    for (const photo of requiredPhotos) {
        if (!files?.[photo]?.[0]?.path) {
            throw new AppError(
                `${photo} is required.`,
                400
            );
        }
    }

    // Build inspection object
    const inspectionData = {
        frontPhoto: files.frontPhoto[0].path,
        rearPhoto: files.rearPhoto[0].path,
        dashboardPhoto: files.dashboardPhoto[0].path,
        odometerPhoto: files.odometerPhoto[0].path,
        tyrePhoto: files.tyrePhoto[0].path,
        safetyEquipmentPhoto:
            files.safetyEquipmentPhoto[0].path,
    };

    // Create inspection
    const inspection =
        await VehicleInspection.create({
            ...inspectionData,
            vehicleId: vehicle.id,
        });

    return inspection;
};

export const getVehicleInspectionService = async (
    userId,
    vehicleId
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
            id: vehicleId,
            driverId: driver.id,
        },
    });

    if (!vehicle) {
        throw new AppError(
            "Vehicle not found.",
            404
        );
    }

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
    vehicleId,
    files
) => {

    // Get inspection belonging to this vehicle
    const inspection =
        await getVehicleInspectionService(
            userId,
            vehicleId
        );

    const inspectionData = {};

    if (files?.frontPhoto?.[0]) {
        inspectionData.frontPhoto =
            files.frontPhoto[0].path;
    }

    if (files?.rearPhoto?.[0]) {
        inspectionData.rearPhoto =
            files.rearPhoto[0].path;
    }

    if (files?.dashboardPhoto?.[0]) {
        inspectionData.dashboardPhoto =
            files.dashboardPhoto[0].path;
    }

    if (files?.odometerPhoto?.[0]) {
        inspectionData.odometerPhoto =
            files.odometerPhoto[0].path;
    }

    if (files?.tyrePhoto?.[0]) {
        inspectionData.tyrePhoto =
            files.tyrePhoto[0].path;
    }

    if (files?.safetyEquipmentPhoto?.[0]) {
        inspectionData.safetyEquipmentPhoto =
            files.safetyEquipmentPhoto[0].path;
    }

    inspectionData.inspectionStatus = "PENDING";
    inspectionData.reviewNote = null;
    inspectionData.reviewedAt = null;

    await inspection.update(inspectionData);

    return inspection;
};