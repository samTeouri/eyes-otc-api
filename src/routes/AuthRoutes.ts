import express from "express";
import { body, header } from "express-validator";
import { citizenLogin, adminLogin, citizenRegister, refreshAccessToken } from "../controllers/AuthController";
import { RequestValidationService } from "../services/RequestValidationService";

export const authRoutes = express.Router();
const requestValidationService = new RequestValidationService();

// Ctizen Register route
authRoutes.post('/register',
    [
        body('lastName').isString().notEmpty(),
        body('firstName').isString().notEmpty(),
        body('email').isString().notEmpty().custom(async (value) => requestValidationService.validateIdentifier(value, 'email')),
        body('password').isAlphanumeric().notEmpty().isLength({min: 8}),
        body('phone').isNumeric().notEmpty().custom(async (value) => requestValidationService.validateIdentifier(value, 'phone')),
    ],
    citizenRegister,
);

// Citizen Login route
authRoutes.post('/login',
    [
        body('identifier').notEmpty(),
        body('password').notEmpty(),
    ],
    citizenLogin,
);

// Admin login route
authRoutes.post('/admin/login',
    [
        body('identifier').notEmpty(),
        body('password').notEmpty(),
    ],
    adminLogin,
);

// Refresh token route
authRoutes.post('/refreshToken',
    refreshAccessToken,
);