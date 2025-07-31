import constants from '../config/constants.js';
import userModel from '../models/user.model.js';
import AppError from '../utils/appError.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// register user service
const registerUserService = async (data) => {
    const { name, email, password } = data;

    const existingUser = await userModel.findOne({ email });

    if (existingUser)
        throw new AppError(
            constants.CONFLICT,
            'User is already registered with this email'
        );

    // save user
    const newUser = new userModel({ name, email, password });

    await newUser.save();

    return { email: newUser.email };
};


// login user service
const loginUsersService = async (data) => {
    const { email, password } = data;

    const existingUser = await userModel.findOne({ email });

    if (!existingUser)
        throw new AppError(constants.NOT_FOUND, 'User is not present');

    const valid = await bcrypt.compare(password, existingUser.password);
    if (!valid)
        throw new AppError(constants.UNAUTHORIZED, 'Invalid Creentials');

    const SECRET_KEY = process.env.SECRET_KEY;
    const token = jwt.sign(
        { id: existingUser._id },
        SECRET_KEY,
        {
            expiresIn: '10d',
        }
    );

    return token;
};


export {
    registerUserService,
    loginUsersService,

};
