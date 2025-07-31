import asyncHandler from '../utils/asyncHandler.js';
import AppError from '../utils/appError.js';
import constants from '../config/constants.js';
import {
    loginUsersService,
    registerFCMTOkenService,
    registerUserService,
    sendFCMNotificationService
} from '../services/user.service.js';
import responseHandler from '../utils/responseHandler.js';

// registe user
const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
        return next(
            new AppError(constants.BAD_REQUEST, 'All fields are required !!')
        );

    const data = await registerUserService({ name, email, password });

    responseHandler(
        res,
        constants.OK,
        'success',
        'User registered',
        data
    );
});

// login user
const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // console.log('login --> ', email, password);
    if (!email || !password)
        return next(
            new AppError(constants.BAD_REQUEST, 'All fields are required !!')
        );

    const token = await loginUsersService({ email, password });

    responseHandler(res, constants.OK, 'success', 'Login Successfull', {
        email,
        token,
    });
});

// register token
const registerFCMToken = asyncHandler(async (req, res, next) => {

    const token = req.body.token
    const userId = req.user.id

    await registerFCMTOkenService(userId, token)

    responseHandler(res, constants.OK, 'success', 'FCM tokene registered successfully')

})

// send notification
const sendNotification = asyncHandler(async (req, res, next) => {

    const userId = req.user.id
    const { title, body } = req.body

    const response = await sendFCMNotificationService(userId, { title, body })

    responseHandler(res, constants.OK, 'success', 'Notification sent successfully', response)
})


export { registerUser, loginUser, registerFCMToken, sendNotification };
