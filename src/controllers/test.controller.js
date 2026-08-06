import uploadToCloudinary from "../utils/uploadToCloudinary.js";

export const uploadTest = async (req, res) => {
    try {
        const imageUrl = await uploadToCloudinary(
            req.file.path,
            "EcoRide/Test"
        );

        res.status(200).json({
            success: true,
            imageUrl,
        });

    } catch (error) {      
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};