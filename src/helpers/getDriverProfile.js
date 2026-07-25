import DriverProfile from "../models/driver.model.js";
import AppError from "../utils/AppError.js";

const getDriverProfile = async (userId) => {

    const driver = await DriverProfile.findOne({
        where: { userId },
    });

    if (!driver) {
        throw new AppError(
            "Driver profile not found.",
            404
        );
    }

    return driver;
};

export default getDriverProfile;