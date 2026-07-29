import { reviewDriverProfileService,
    getUsersService,
 }
from "../services/admin.service.js";

import { successResponse }
from "../utils/response.js";

export const reviewDriverProfile =
async (req,res,next)=>{

try{

const profile =
await reviewDriverProfileService(

req.params.driverId,

req.body.status,

req.body.reason

);

return successResponse(

res,

200,

"Driver profile reviewed successfully.",

profile

);

}catch(error){

next(error);

}

};


export const getUsers = async (
    req,
    res,
    next
) => {

    try {

        const users =
            await getUsersService(
                req.query
            );

        return successResponse(
            res,
            200,
            "Users retrieved successfully.",
            users
        );

    } catch (error) {

        next(error);

    }

};