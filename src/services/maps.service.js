import axios from "axios";
import AppError from "../utils/AppError.js";

const GOOGLE_URL = "https://maps.googleapis.com/maps/api";

export const autocompleteService = async (input) => {

    if (!input) {
        throw new AppError("Search text is required.", 400);
    }

    const response = await axios.get(
        `${GOOGLE_URL}/place/autocomplete/json`,
        {
            params: {
                input,
                key: process.env.GOOGLE_MAPS_API_KEY,
            },
        }
    );

    return response.data;
};