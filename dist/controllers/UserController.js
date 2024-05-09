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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = void 0;
const User_1 = require("../models/User");
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
        return res.status(500).json({ error: 'Error while getting user info' });
    }
});
exports.getUserInfo = getUserInfo;
