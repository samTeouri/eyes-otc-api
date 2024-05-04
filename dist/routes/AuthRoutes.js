"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const AuthController_1 = require("../controllers/AuthController");
const User_1 = require("../models/User");
exports.authRoutes = express_1.default.Router();
// Ctizen Register route
exports.authRoutes.post('/register', [
    (0, express_validator_1.body)('lastName').isString().notEmpty(),
    (0, express_validator_1.body)('firstName').isString().notEmpty(),
    (0, express_validator_1.body)('email').isString().notEmpty().custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({ where: { email: value } });
        if (user) {
            return Promise.reject('Email already registered');
        }
    })),
    (0, express_validator_1.body)('password').isAlphanumeric().notEmpty().isLength({ min: 8 }),
    (0, express_validator_1.body)('phone').isNumeric().notEmpty().custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({ where: { phone: value } });
        if (user) {
            return Promise.reject('Phone already registered');
        }
    })),
], AuthController_1.citizenRegister);
// Admin Register route
exports.authRoutes.post('/admin/register', [
    (0, express_validator_1.body)('lastName').isString().notEmpty(),
    (0, express_validator_1.body)('firstName').isString().notEmpty(),
    (0, express_validator_1.body)('email').isString().notEmpty().custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({ where: { email: value } });
        if (user) {
            return Promise.reject('Email already registered');
        }
    })),
    (0, express_validator_1.body)('password').isAlphanumeric().notEmpty().isLength({ min: 8 }),
    (0, express_validator_1.body)('phone').isNumeric().notEmpty().custom((value) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({ where: { phone: value } });
        if (user) {
            return Promise.reject('Phone already registered');
        }
    })),
], AuthController_1.adminRegister);
// Citizen Login route
exports.authRoutes.post('/login', [
    (0, express_validator_1.body)('identifier').notEmpty(),
    (0, express_validator_1.body)('password').notEmpty().isString(),
], AuthController_1.citizenLogin);
// Admin login route
exports.authRoutes.post('/admin/login/', [
    (0, express_validator_1.body)('identifier').notEmpty(),
    (0, express_validator_1.body)('password').notEmpty().isString(),
], AuthController_1.adminLogin);
