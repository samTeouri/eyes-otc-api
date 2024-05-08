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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = exports.citizenLogin = exports.adminRegister = exports.citizenRegister = void 0;
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const User_1 = require("../models/User");
const Role_1 = require("../models/Role");
const AuthService_1 = require("../services/AuthService");
const authService = new AuthService_1.AuthService();
// Citizen registration
const citizenRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate form values and manage errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Get user register form values from body
        const { firstName, lastName, email, phone, address, password } = req.body;
        // Create an instance of user
        const user = new User_1.User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            address: address,
            password: yield bcrypt.hash(password, 15),
        });
        // Store user in database
        yield user.save();
        // Set user citizen role
        const citizenRole = yield Role_1.Role.findOne({ name: 'citizen' });
        if (citizenRole) {
            user.roles.push(citizenRole);
            yield user.save();
        }
        return res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Registration failed' });
    }
});
exports.citizenRegister = citizenRegister;
// Admin registration
const adminRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate form values and manage errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Get user register form values from body
        const { firstName, lastName, email, address, password } = req.body;
        // Create an instance of user
        const user = new User_1.User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            address: address,
            password: yield bcrypt.hash(password, 15),
        });
        // Store user in database
        yield user.save();
        // Set user admin role
        const adminRole = yield Role_1.Role.findOne({ name: 'admin' });
        if (adminRole) {
            user.roles.push(adminRole);
            yield user.save();
        }
        return res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Registration failed' });
    }
});
exports.adminRegister = adminRegister;
// Citizen login
const citizenLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate form values and manage errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Get user register form values from body
        const { identifier, password } = req.body;
        // Get user instance using given identifier
        const user = yield authService.getUserByIdentifier(identifier);
        // User with given identifier exist
        if (user) {
            // Check if given password is correct
            const isPasswordCorrect = yield bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ error: 'Password is incorrect' });
            }
            // Token signature
            const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET_KEY);
            return res.status(200).json({
                user: user,
                _token: token,
            });
        }
        else {
            // User with given identifier doesn't exist
            return res.status(401).json({ error: 'Email or phone doesn\'t exist' });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Login failed' });
    }
});
exports.citizenLogin = citizenLogin;
// Admin login
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate form values and manage errors
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Get user register form values from body
        const { identifier, password } = req.body;
        // Get user instance using given identifier
        const user = yield authService.getUserByIdentifier(identifier);
        // User with given identifier exist
        if (user) {
            // Check if given password is correct
            const isPasswordCorrect = yield bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(401).json({ error: 'Password is incorrect' });
            }
            // Token signature
            const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY);
            return res.status(200).json({
                user: user,
                _token: token,
            });
        }
        else {
            // User with given identifier doesn't exist
            return res.status(401).json({ error: 'Email or phone doesn\'t exist' });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Login failed' });
    }
});
exports.adminLogin = adminLogin;
