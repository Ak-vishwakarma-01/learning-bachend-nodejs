import express from 'express';
import { userLogin, userRegister } from '../controllers/user.js';

const router = express.Router();

// user register
router.post('/register', userRegister); // api/user/register

// user login
router.post('/login', userLogin); // api/user/login

export default router;
