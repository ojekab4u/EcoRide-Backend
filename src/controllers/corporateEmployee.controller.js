import {

    addEmployeeService,
    getEmployeesService,
    getEmployeeService,
    updateEmployeeService,
    removeEmployeeService,

} from "../services/corporateEmployee.service.js";

import { successResponse } from "../utils/response.js";

export const addEmployee = async (
    req,
    res,
    next
) => {

    try {

        const employee =
            await addEmployeeService(
                req.user.id,
                req.body
            );

        return successResponse(
            res,
            201,
            "Employee added successfully.",
            employee
        );

    } catch (error) {

        next(error);

    }

};

export const getEmployees = async (
    req,
    res,
    next
) => {

    try {

        const employees =
            await getEmployeesService(
                req.user.id
            );

        return successResponse(
            res,
            200,
            "Employees retrieved successfully.",
            employees
        );

    } catch (error) {

        next(error);

    }

};

export const getEmployee = async (
    req,
    res,
    next
) => {

    try {

        const employee =
            await getEmployeeService(
                req.user.id,
                req.params.id
            );

        return successResponse(
            res,
            200,
            "Employee retrieved successfully.",
            employee
        );

    } catch (error) {

        next(error);

    }

};

export const updateEmployee = async (
    req,
    res,
    next
) => {

    try {

        const employee =
            await updateEmployeeService(
                req.user.id,
                req.params.id,
                req.body
            );

        return successResponse(
            res,
            200,
            "Employee updated successfully.",
            employee
        );

    } catch (error) {

        next(error);

    }

};

export const removeEmployee = async (
    req,
    res,
    next
) => {

    try {

        await removeEmployeeService(
            req.user.id,
            req.params.id
        );

        return successResponse(
            res,
            200,
            "Employee removed successfully."
        );

    } catch (error) {

        next(error);

    }

};