import axios from "axios";

export const autocomplete = async (req, res, next) => {
    try {

        const { input } = req.query;

        const response = await axios.post(
            "https://places.googleapis.com/v1/places:autocomplete",
            {
                input
            },
            {
                headers: {
                    "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
                    "X-Goog-FieldMask": "*",
                    "Content-Type": "application/json"
                }
            }
        );

        return res.json(response.data);

    } catch (error) {

        console.log(error.response?.data);

        next(error);

    }
};