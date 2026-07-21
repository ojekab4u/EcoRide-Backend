import User from "../models/user.model.js"

export const registerUser = async (req, res) => {

    try {

        const user = await User.create(req.body);

        res.status(201).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }

};