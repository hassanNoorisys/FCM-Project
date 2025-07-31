import { Router } from 'express';
import {
    loginUser,
    registerUser
} from '../controller/user.controller.js';

const route = Router();

// login and registration
route
    .post('/register', registerUser)
    .post('/login', loginUser);


export default route;
