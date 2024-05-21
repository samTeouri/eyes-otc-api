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
exports.getSupportCenters = exports.getConnectedSupportCenter = void 0;
const SupportCenter_1 = require("../../models/SupportCenter");
const User_1 = require("../../models/User");
const getConnectedSupportCenter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get connected user
        const user = yield User_1.User.findById(req.body.user.id);
        const supportCenter = yield SupportCenter_1.SupportCenter.findOne({ user: user });
        res.status(200).json({ supportCenter: supportCenter });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while getting connected support center' });
    }
});
exports.getConnectedSupportCenter = getConnectedSupportCenter;
const getSupportCenters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supportCenters = yield SupportCenter_1.SupportCenter.find()
            .populate('location')
            .populate('service')
            .populate('location')
            .populate('user')
            .populate('incidents');
        res.status(200).json({ supportCenters: supportCenters });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while getting support centers with their locations' });
    }
});
exports.getSupportCenters = getSupportCenters;
