import uploadToCloudinary from "./uploadToCloudinary.js";

export default async function buildCorporateDocumentUploads(files) {

    const documentData = {};

    if (files?.cacCertificate?.length) {
        documentData.cacCertificate =
            await uploadToCloudinary(
                files.cacCertificate[0].path,
                "corporate-documents"
            );
    }

    if (files?.taxCertificate?.length) {
        documentData.taxCertificate =
            await uploadToCloudinary(
                files.taxCertificate[0].path,
                "corporate-documents"
            );
    }

    if (files?.businessLicense?.length) {
        documentData.businessLicense =
            await uploadToCloudinary(
                files.businessLicense[0].path,
                "corporate-documents"
            );
    }

    return documentData;
}