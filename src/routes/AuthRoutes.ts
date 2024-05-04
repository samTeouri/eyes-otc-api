import express from "express";
import { body, header } from "express-validator";
import { citizenLogin, adminLogin, adminRegister, citizenRegister, adminGetLogin, getDashboard } from "../controllers/AuthController";
import { User } from "../models/User";
import { authVerifyToken } from "../middlewares/AuthMiddleware";

export const authRoutes = express.Router();

// Ctizen Register route
authRoutes.post('/register',
    [
        body('lastName').isString().notEmpty(),
        body('firstName').isString().notEmpty(),
        body('email').isString().notEmpty().custom(async (value) => {
            const user =  await User.findOne({ where: {email: value} });
            if (user) {
                return Promise.reject('Email already registered');
            }
        }),
        body('password').isAlphanumeric().notEmpty().isLength({min: 8}),
        body('phone').isNumeric().notEmpty().custom(async (value) => {
            const user =  await User.findOne({ where: {phone: value} });
            if (user) {
                return Promise.reject('Phone already registered');
            }
        }),
    ],
    citizenRegister,
);

// Admin Register route
authRoutes.post('/admin/register',
    // [
    //     body('lastName').isString().notEmpty(),
    //     body('firstName').isString().notEmpty(),
    //     body('email').isString().notEmpty().custom(async (value) => {
    //         const user =  await User.findOne({ where: {email: value} });
    //         if (user) {
    //             return Promise.reject('Email already registered');
    //         }
    //     }),
    //     body('password').isAlphanumeric().notEmpty().isLength({min: 8}),
    // ],
    adminRegister,
);

// Citizen Login route
authRoutes.post('/login',
    [
        body('identifier').notEmpty(),
        body('password').notEmpty().isString(),
    ],
    citizenLogin,
);

// Admin login route
authRoutes.post('/admin/login/',
    [
        body('identifier').notEmpty(),
        body('password').notEmpty().isString(),
    ],
    adminLogin,
);

// Admin auth page
authRoutes.get('/admin/login/',
    adminGetLogin,
);

// Show dashboard
authRoutes.get('/admin/dashboard',
    authVerifyToken,
    getDashboard,
);