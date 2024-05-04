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
exports.getSupportCenterIncidents = exports.handleIncident = exports.reportIncident = void 0;
const express_validator_1 = require("express-validator");
const Incident_1 = require("../models/Incident");
const UploadImage_1 = require("../utils/UploadImage");
const UploadVideo_1 = require("../utils/UploadVideo");
const User_1 = require("../models/User");
const Notification_1 = require("../models/Notification");
const SupportCenter_1 = require("../models/SupportCenter");
const reportIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate form values and manage errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Get form values from body
    const { description, troubles } = req.body;
    let uploadImageResult;
    let uploadVideoResult;
    try {
        uploadImageResult = yield (0, UploadImage_1.handleSingleUploadImage)(req, res);
        uploadVideoResult = yield (0, UploadVideo_1.handleSingleUploadVideo)(req, res);
    }
    catch (e) {
        console.log(e.message);
        return res.status(422).json({ message: "Server was unable to process the contained instructions" });
    }
    const user = yield User_1.User.findByPk(req.body.user);
    if (!(user === null || user === void 0 ? void 0 : user.hasRole(1))) {
        return res.status(403).json({ error: 'You are not authorized to perform this action' });
    }
    if (user) {
        yield user.createIncident({
            description: description,
            picture: uploadImageResult.path,
            video: uploadVideoResult.path,
        }).then((incident) => __awaiter(void 0, void 0, void 0, function* () {
            yield incident.setTroubles(troubles);
            const supportCenters = yield incident.getConcernedSupportCenters();
            yield incident.setSupportCenters(supportCenters);
            res.status(201).json({ message: "Incident reported succesfully !" });
        })).catch((reason) => {
            console.log(`Error : ${reason}`);
            return res.status(500).json({ error: 'Error while reporting incident' });
        });
    }
    else {
        return res.status(404).json({ error: 'User not found' });
    }
});
exports.reportIncident = reportIncident;
const handleIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Validate form values and manage errors
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = yield User_1.User.findByPk(req.body.user);
        if (!((user === null || user === void 0 ? void 0 : user.hasRole(3)) || (user === null || user === void 0 ? void 0 : user.hasRole(2)))) {
            return res.status(403).json({ error: 'You are not authorized to perform this action' });
        }
        const { isHandled } = req.body;
        const incident = yield Incident_1.Incident.findByPk(req.params.incidentId)
            .then((incident) => __awaiter(void 0, void 0, void 0, function* () {
            const notification = yield Notification_1.Notification.findOne({ where: { incidentId: incident === null || incident === void 0 ? void 0 : incident.id } });
            notification === null || notification === void 0 ? void 0 : notification.update({ isHandled: isHandled });
            if (isHandled) {
                res.status(201).json({ message: "Incident handled succesfully !" });
            }
            else {
                res.status(201).json({ message: "Incident declined succesfully !" });
            }
        }))
            .catch((reason) => {
            console.log(`Error : ${reason}`);
            return res.status(500).json({ error: 'Error while incident handling' });
        });
    }
    catch (error) {
    }
});
exports.handleIncident = handleIncident;
const getSupportCenterIncidents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findByPk(req.body.user);
    if (user === null || user === void 0 ? void 0 : user.hasRole(1)) {
        return res.status(403).json({ error: 'You are not authorized to perform this action' });
    }
    const supportCenter = yield SupportCenter_1.SupportCenter.findByPk(req.params.supportCenterId);
    const incidents = yield (supportCenter === null || supportCenter === void 0 ? void 0 : supportCenter.getIncidents());
    return res.json({ incidents: incidents });
});
exports.getSupportCenterIncidents = getSupportCenterIncidents;
