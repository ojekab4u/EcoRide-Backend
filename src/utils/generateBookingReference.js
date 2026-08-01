export const generateBookingReference = () => {

    return `ECR-${Date.now()}-${Math.floor(
        Math.random() * 1000
    )}`;

};
