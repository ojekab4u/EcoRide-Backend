export const updateUserVerificationStatus = async (user) => {
    if (user.emailVerified && user.phoneVerified) {
        user.isVerified = true;
        await user.save();
    }
};