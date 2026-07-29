import uploadToCloudinary from "./uploadToCloudinary.js";

const buildDriverDocumentUploads = async (files = {}) => {
    const data = {};

    if (files.nationalId?.[0]) {
        data.nationalIdUrl = await uploadToCloudinary(
            files.nationalId[0].path,
            "EcoRide/DriverDocuments"
        );
    }

    if (files.driverLicense?.[0]) {
        data.driverLicenseUrl = await uploadToCloudinary(
            files.driverLicense[0].path,
            "EcoRide/DriverDocuments"
        );
    }

    if (files.vehicleRegistration?.[0]) {
        data.vehicleRegistrationUrl = await uploadToCloudinary(
            files.vehicleRegistration[0].path,
            "EcoRide/DriverDocuments"
        );
    }

    if (files.insuranceCertificate?.[0]) {
        data.insuranceCertificateUrl = await uploadToCloudinary(
            files.insuranceCertificate[0].path,
            "EcoRide/DriverDocuments"
        );
    }

    if (files.selfie?.[0]) {
        data.selfieUrl = await uploadToCloudinary(
            files.selfie[0].path,
            "EcoRide/DriverDocuments"
        );
    }

    return data;
};

export default buildDriverDocumentUploads;