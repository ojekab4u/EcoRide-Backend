import uploadToCloudinary from "./uploadToCloudinary.js";

const buildPassengerDocumentUploads = async (files = {}) => {

    const data = {};

    if (files.nationalIdFront?.[0]) {
        data.nationalIdFront = await uploadToCloudinary(
            files.nationalIdFront[0].path,
            "EcoRide/PassengerDocuments"
        );
    }

    if (files.nationalIdBack?.[0]) {
        data.nationalIdBack = await uploadToCloudinary(
            files.nationalIdBack[0].path,
            "EcoRide/PassengerDocuments"
        );
    }

    if (files.selfie?.[0]) {
        data.selfie = await uploadToCloudinary(
            files.selfie[0].path,
            "EcoRide/PassengerDocuments"
        );
    }

    return data;
};

export default buildPassengerDocumentUploads;