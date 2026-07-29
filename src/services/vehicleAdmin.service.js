import Vehicle from "../models/vehicle.model.js";
import AppError from "../utils/AppError.js";
import DriverProfile from "../models/driver.model.js";
import VehicleInspection from "../models/vehicleInspection.model.js";
import { paginate , getPagingData,} from "../utils/pagination.js";

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

export const getAllVehiclesForReviewService = async (
    page,
    limit,
    status
) => {

    const {
        limit: pageLimit,
        offset,
        currentPage,
    } = paginate({
        page,
        limit,
    });

    const where = {};

    if (status) {
        where.verificationStatus =
            status.toUpperCase();
    }

    const { count, rows } =
        await Vehicle.findAndCountAll({

            where,

            include: [
                DriverProfile,
                VehicleInspection,
            ],

            limit: pageLimit,

            offset,

            order: [
                ["createdAt", "DESC"],
            ],

        });

    return getPagingData(
        count,
        rows,
        currentPage,
        pageLimit
    );

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