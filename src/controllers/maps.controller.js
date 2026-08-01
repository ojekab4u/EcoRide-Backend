import { autocompleteService } from "../services/maps.service.js";
import { successResponse } from "../utils/response.js";

export const autocomplete = async (req, res, next) => {

    try {

        const data = await autocompleteService(req.query.input);

        return successResponse(
            res,
            200,
            "Locations retrieved successfully.",
            data
        );

    } catch (error) {

        next(error);

    }

};