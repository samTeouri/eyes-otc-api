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
const RequestValidationService_1 = require("../services/RequestValidationService");
exports.authRoutes = express_1.default.Router();
const requestValidationService = new RequestValidationService_1.RequestValidationService();
// Ctizen Register route
exports.authRoutes.post('/register', [
    (0, express_validator_1.body)('lastName').isString().notEmpty(),
    (0, express_validator_1.body)('firstName').isString().notEmpty(),
    (0, express_validator_1.body)('email').isString().notEmpty().custom((value) => __awaiter(void 0, void 0, void 0, function* () { return requestValidationService.validateIdentifier(value, 'email'); })),
    (0, express_validator_1.body)('password').isAlphanumeric().notEmpty().isLength({ min: 8 }),
    (0, express_validator_1.body)('phone').isNumeric().notEmpty().custom((value) => __awaiter(void 0, void 0, void 0, function* () { return requestValidationService.validateIdentifier(value, 'phone'); })),
], AuthController_1.citizenRegister);
// Admin Register route
exports.authRoutes.post('/admin/register', 
// [
//     body('lastName').isString().notEmpty(),
//     body('firstName').isString().notEmpty(),
//     body('email').isString().notEmpty().custom(async (value) => requestValidationService.validateIdentifier(value, 'email')),
//     body('password').isAlphanumeric().notEmpty().isLength({min: 8}),
// ],
AuthController_1.adminRegister);
// Citizen Login route
exports.authRoutes.post('/login', [
    (0, express_validator_1.body)('identifier').notEmpty(),
    (0, express_validator_1.body)('password').notEmpty(),
], AuthController_1.citizenLogin);
// Admin login route
exports.authRoutes.post('/admin/login/', [
    (0, express_validator_1.body)('identifier').notEmpty(),
    (0, express_validator_1.body)('password').notEmpty(),
], AuthController_1.adminLogin);
