import express from "express";
import { body, header } from "express-validator";
import { login, register } from "../controllers/authController";
import { User } from "../models/User";

export const authRoutes = express.Router();

// Register route
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
    register,
);

// Login route
authRoutes.post('/login',
    [
        body('identifier').notEmpty(),
        body('password').notEmpty().isString(),
    ],
    login,
);