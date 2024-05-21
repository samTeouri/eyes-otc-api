"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const HomeController_1 = require("../../controllers/web/HomeController");
const AuthMiddlewares_1 = require("../../middlewares/AuthMiddlewares");
exports.viewsRoutes = express_1.default.Router();
// Show dashboard route
exports.viewsRoutes.get('/dashboard', AuthMiddlewares_1.authVerifyWebToken, HomeController_1.getDashboard);
