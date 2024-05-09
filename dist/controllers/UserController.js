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
exports.changePassword = exports.updateUser = exports.getUserInfo = exports.getAllUsers = void 0;
const bcrypt = __importStar(require("bcrypt"));
const User_1 = require("../models/User");
const RequestValidationService_1 = require("../services/RequestValidationService");
const AuthService_1 = require("../services/AuthService");
const requestValidationService = new RequestValidationService_1.RequestValidationService();
const authService = new AuthService_1.AuthService();
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get all users
        const users = yield User_1.User.find().populate('incidents').populate('roles');
        if (users)
            return res.status(200).json({ users: users });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while getting users' });
    }
});
exports.getAllUsers = getAllUsers;
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find user by ID
        const user = yield User_1.User.findById(req.params.userId).populate('incidents').populate('roles');
        if (user)
            return res.status(200).json({ user: user });
        return res.status(404).json({ message: 'User not found' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while getting user infos' });
    }
});
exports.getUserInfo = getUserInfo;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lastName, firstName, email, phone, address } = req.body;
        // Find user by ID
        const user = yield User_1.User.findById(req.body.user.id);
        if (user) {
            if (lastName)
                user.lastName = lastName;
            if (firstName)
                user.firstName = firstName;
            if (email)
                user.email = email;
            if (phone)
                user.phone = phone;
            if (address)
                user.address = address;
            yield user.save();
            return res.status(200).json({ message: 'User updated successfully' });
        }
        return res.status(404).json({ message: 'User not found' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while updating user infos' });
    }
});
exports.updateUser = updateUser;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);
        // Get form values from body
        const { newPassword, oldPassword } = req.body;
        // Find user by ID
        const user = yield User_1.User.findById(req.body.user.id);
        if (user) {
            if (yield authService.checkPassword(user, oldPassword)) {
                if (newPassword !== oldPassword) {
                    user.password = yield bcrypt.hash(newPassword, 15);
                    yield user.save();
                    return res.status(200).json({ message: 'Password changed succesfully' });
                }
                return res.status(400).json({ message: 'New password should not be the same as old password' });
            }
            return res.status(400).json({ message: 'Password provided is incorrect' });
        }
        return res.status(404).json({ message: 'User not found' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while changing user password' });
    }
});
exports.changePassword = changePassword;
