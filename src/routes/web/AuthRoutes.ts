import express from "express";
import { adminLogin, adminLogout, getAdminLogin } from "../../controllers/web/AuthController";

export const adminAuthRoutes = express.Router();

// Get Login route
adminAuthRoutes.get('/login', getAdminLogin);

// Login
adminAuthRoutes.post('/login', adminLogin)

// Logout
adminAuthRoutes.post('/logout', adminLogout)