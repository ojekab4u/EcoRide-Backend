
import { successResponse }
from "../utils/response.js";
import {
    reviewDriverProfileService,
    reviewPassengerProfileService,
    getUsersService,
    updateUserRoleService,
    getDriverDetailsService,
    getPassengerDetailsService,
    getDriversService,
    getPassengersService,

    getCorporatesService,
    getCorporateDetailsService,
    reviewCorporateProfileService,

} from "../services/admin.service.js";
import User from "../models/user.model.js";
import VehicleInspection from "../models/vehicleInspection.model.js";


export const updateUserRole = async (
    req,
    res,
    next
) => {

    try {

        const user =
            await updateUserRoleService(
                req.params.id,
                req.body.role
            );

        return successResponse(
            res,
            200,
            "User role updated successfully.",
            user
        );

    } catch (error) {

        next(error);

    }

};

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


export const getDriverDetails = async (req, res, next) => {
    try {
        const data = await getDriverDetailsService(
            req.params.driverId
        );

        return successResponse(
            res,
            200,
            "Driver details retrieved successfully.",
            data
        );
    } catch (error) {
        next(error);
    }
};

export const getPassengerDetails = async (req, res, next) => {
    try {
        const data = await getPassengerDetailsService(
            req.params.passengerId
        );

        return successResponse(
            res,
            200,
            "Passenger details retrieved successfully.",
            data
        );
    } catch (error) {
        next(error);
    }
};



export const getDrivers = async (req, res, next) => {
    try {

        const drivers = await getDriversService();

        return successResponse(
            res,
            200,
            "Drivers retrieved successfully.",
            drivers
        );

    } catch (error) {
        next(error);
    }
};

export const getPassengers = async (req, res, next) => {
    try {

        const passengers = await getPassengersService();

        return successResponse(
            res,
            200,
            "Passengers retrieved successfully.",
            passengers
        );

    } catch (error) {
        next(error);
    }
};


export const reviewPassengerProfile = async (
    req,
    res,
    next
) => {

    try {

        const document =
            await reviewPassengerProfileService(

                req.params.passengerId,

                req.body.status,

                req.body.reason

            );

        return successResponse(
            res,
            200,
            "Passenger profile reviewed successfully.",
            document
        );

    } catch (error) {

        next(error);

    }

};

export const getCorporates = async (
    req,
    res,
    next
) => {

    try {

        const corporates =
            await getCorporatesService();

        return successResponse(
            res,
            200,
            "Corporates retrieved successfully.",
            corporates
        );

    } catch (error) {

        next(error);

    }

};

export const getCorporateDetails = async (
    req,
    res,
    next
) => {

    try {

        const corporate =
            await getCorporateDetailsService(
                req.params.corporateId
            );

        return successResponse(
            res,
            200,
            "Corporate details retrieved successfully.",
            corporate
        );

    } catch (error) {

        next(error);

    }

};

export const reviewCorporateProfile = async (
    req,
    res,
    next
) => {

    try {

        const corporate =
            await reviewCorporateProfileService(

                req.params.corporateId,

                req.body.status,

                req.body.reason

            );

        return successResponse(
            res,
            200,
            "Corporate profile reviewed successfully.",
            corporate
        );

    } catch (error) {

        next(error);

    }

};

