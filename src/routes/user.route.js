import { Router } from 'express';
import {
    loginUser,
    registerFCMToken,
    registerUser,
    sendNotification
} from '../controller/user.controller.js';
import verifyToken from '../middleware/verifyToken.js';

const route = Router();

// login and registration
route
    .post('/register', registerUser)
    .post('/login', loginUser);

route.post('/register-token', verifyToken, registerFCMToken)

route.post('send-notification', verifyToken, sendNotification)
export default route;
