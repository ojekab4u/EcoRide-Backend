import cloudinary from "../config/cloudinary.js";
import fs from "fs";

const uploadToCloudinary = async (
    filePath,
    folder = "EcoRide"
) => {
    const result = await cloudinary.uploader.upload(
        filePath,
        {
            folder,
        }
    );

    fs.unlinkSync(filePath);

    return result.secure_url;
};

export default uploadToCloudinary;