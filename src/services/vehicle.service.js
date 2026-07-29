import Vehicle from "../models/vehicle.model.js";
import DriverProfile from "../models/driver.model.js";
import AppError from "../utils/AppError.js";
import normalizePlateNumber from "../utils/normalizePlateNumber.js";
import VehicleInspection from "../models/vehicleInspection.model.js";

export const createVehicleService = async (
    userId,
    vehicleData
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

    vehicleData.plateNumber = normalizePlateNumber(
    vehicleData.plateNumber
);

    const existingVehicle = await Vehicle.findOne({
        where: {
            plateNumber: vehicleData.plateNumber,           
        },
    });

    if (existingVehicle) {
        throw new AppError(
            "Plate number already exists.",
            400
        );
    }
    
    const vehicle = await Vehicle.create({
        ...vehicleData,
        driverId: driver.id,
    });

    return vehicle;
};

export const getVehiclesService = async (userId) => {

    const driver = await DriverProfile.findOne({
        where: { userId },
    });

    if (!driver) {
        throw new AppError(
            "Driver profile not found.",
            404
        );
    }

    return await Vehicle.findAll({
        where: {
            driverId: driver.id,
        },
        include: [
        {
            model: VehicleInspection,
        },
    ],
        order: [["createdAt", "DESC"]],
    });
};

export const getVehicleByIdService = async (
    userId,
    vehicleId
) => {

    const driver = await DriverProfile.findOne({
        where: { userId },
    });

    const vehicle = await Vehicle.findOne({
        where: {
            id: vehicleId,
            driverId: driver.id,          
        },
         include: [
        {
            model: VehicleInspection,
        },
    ],
    });

    if (!vehicle) {
        throw new AppError(
            "Vehicle not found.",
            404
        );
    }

    return vehicle;
};

export const updateVehicleService = async (
    userId,
    vehicleId,
    vehicleData
) => {

    const vehicle = await getVehicleByIdService(
        userId,
        vehicleId
    );

    delete vehicleData.verificationStatus;
    delete vehicleData.vehicleImage;
    

    if (vehicleData.plateNumber) {
    vehicleData.plateNumber = normalizePlateNumber(
        vehicleData.plateNumber
    );

    const existingVehicle = await Vehicle.findOne({
        where: {
            plateNumber: vehicleData.plateNumber,
            
        },
    });

    if (
        existingVehicle &&
        existingVehicle.id !== vehicle.id
    ) {
        throw new AppError(
            "Plate number already exists.",
            400
        );
    }
}
    await vehicle.update(vehicleData);

    return vehicle;
};

export const deleteVehicleService = async (
    userId,
    vehicleId
) => {

    const vehicle = await getVehicleByIdService(
        userId,
        vehicleId
    );

   await vehicle.save();

    return;
};