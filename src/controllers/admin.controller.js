import { reviewDriverProfileService }
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