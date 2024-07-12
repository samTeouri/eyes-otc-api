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
exports.setFcmToken = void 0;
const User_1 = require("../../models/User");
const setFcmToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.session.user) {
            const user = yield User_1.User.findById(req.session.user._id);
            if (user) {
                user.fcmToken = req.body.fcmToken;
                yield user.save();
            }
            res.status(200).json({
                message: "Device token stored on the server-side successfully !",
                user: req.session.user
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while storing token on the server-side !' });
    }
});
exports.setFcmToken = setFcmToken;
