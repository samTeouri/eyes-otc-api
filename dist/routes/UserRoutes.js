"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express = __importStar(require("express"));
const userController = __importStar(require("../controllers/UserController"));
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const express_validator_1 = require("express-validator");
exports.userRouter = express.Router();
// Get all users
exports.userRouter.get('/index', AuthMiddleware_1.authVerifyToken, userController.getAllUsers);
// Get user infos
exports.userRouter.get('/infos/:userId', AuthMiddleware_1.authVerifyToken, userController.getUserInfo);
// Change user password
exports.userRouter.post('/changePassword', [
    (0, express_validator_1.body)('newPassword').exists().isAlphanumeric(),
    (0, express_validator_1.body)('oldPassword').exists().isAlphanumeric(),
], AuthMiddleware_1.authVerifyToken, userController.changePassword);
// Update user
exports.userRouter.post('/update', [
    (0, express_validator_1.body)('lastName').isString(),
    (0, express_validator_1.body)('firstName').isString(),
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('phone').isNumeric(),
    (0, express_validator_1.body)('address').isString(),
], AuthMiddleware_1.authVerifyToken, userController.updateUser);
