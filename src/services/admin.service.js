import DriverProfile from "../models/driver.model.js";
import AppError from "../utils/AppError.js";

export const reviewDriverProfileService = async (
    driverId,
    status,
    reason
) => {

    const profile =
        await DriverProfile.findByPk(driverId);

    if (!profile) {
        throw new AppError(
            "Driver profile not found.",
            404
        );
    }

    profile.verificationStatus = status;

    if (status === "REJECTED") {

        profile.rejectionReason = reason;

        profile.profileCompleted = false;

    } else {

        profile.rejectionReason = null;

        profile.profileCompleted = true;

    }

    await profile.save();

    return profile;

};