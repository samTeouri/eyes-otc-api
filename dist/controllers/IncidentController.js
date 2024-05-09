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
const Incident_1 = require("../models/Incident");
const User_1 = require("../models/User");
const Notification_1 = require("../models/Notification");
const SupportCenter_1 = require("../models/SupportCenter");
const UploadFile_1 = require("../utils/UploadFile");
const RequestValidationService_1 = require("../services/RequestValidationService");
const Location_1 = require("../models/Location");
const requestValidationService = new RequestValidationService_1.RequestValidationService();
const reportIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);
        // Get form values from body
        const { description, troubles, latitude, longitude } = req.body;
        // Create Location
        const location = yield Location_1.Location.create({
            latitude: latitude,
            longitude: longitude,
        });
        // Handle file uploads
        let uploadPictureResult = yield (0, UploadFile_1.handleFilesUpload)(req, res);
        // Find user by ID
        const user = yield User_1.User.findById(req.body.user.id);
        // Create incident
        const incident = new Incident_1.Incident({
            description: description,
            picture: uploadPictureResult.path,
            user: user,
            location: location,
        });
        // Set troubles
        troubles.forEach((trouble) => __awaiter(void 0, void 0, void 0, function* () {
            yield incident.troubles.push(trouble);
        }));
        // Get concerned support centers
        const supportCenters = yield incident.getConcernedSupportCenters();
        // Set support centers
        incident.supportCenters = supportCenters;
        // Save incident
        yield incident.save();
        return res.status(201).json({ message: 'Incident reported successfully!' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while reporting incident' });
    }
});
exports.reportIncident = reportIncident;
const handleIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);
        // Find user by ID
        const user = yield User_1.User.findById(req.body.user.id);
        // Get isHandled from request body
        const { isHandled } = req.body;
        // Find incident by ID
        const incident = yield Incident_1.Incident.findById(req.params.incidentId);
        // Update incident notification
        const notification = yield Notification_1.Notification.findOne({ incident: incident === null || incident === void 0 ? void 0 : incident._id });
        if (notification) {
            notification.isHandled = isHandled;
            yield notification.save();
        }
        // Send response
        if (isHandled) {
            return res.status(201).json({ message: 'Incident handled successfully!' });
        }
        else {
            return res.status(201).json({ message: 'Incident declined successfully!' });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while incident handling' });
    }
});
exports.handleIncident = handleIncident;
const getSupportCenterIncidents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);
        // Find user by ID
        const user = yield User_1.User.findById(req.body.user);
        // Find support center by ID
        const supportCenter = yield SupportCenter_1.SupportCenter.findById(req.params.supportCenterId);
        // Get incidents of support center
        const incidents = yield Incident_1.Incident.find({ supportCenters: supportCenter === null || supportCenter === void 0 ? void 0 : supportCenter._id })
            .populate('location')
            .populate('user')
            .populate('troubles')
            .populate('supportCenters');
        // Send response
        return res.json({ incidents: incidents });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while fetching support center incidents' });
    }
});
exports.getSupportCenterIncidents = getSupportCenterIncidents;
