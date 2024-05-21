"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../../controllers/web/AuthController");
exports.adminAuthRoutes = express_1.default.Router();
// Get Login route
exports.adminAuthRoutes.get('/login', AuthController_1.getAdminLogin);
// Login
exports.adminAuthRoutes.post('/login', AuthController_1.adminLogin);
// Logout
exports.adminAuthRoutes.post('/logout', AuthController_1.adminLogout);
