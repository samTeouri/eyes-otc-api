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
exports.getUserIncidents = exports.getSupportCenterIncidents = exports.notificationState = exports.getIncidentDetails = exports.updateIncident = exports.handleIncident = exports.reportIncident = void 0;
const Incident_1 = require("../../models/Incident");
const User_1 = require("../../models/User");
const Notification_1 = require("../../models/Notification");
const SupportCenter_1 = require("../../models/SupportCenter");
const RequestValidationService_1 = require("../../services/RequestValidationService");
const Location_1 = require("../../models/Location");
const Role_1 = require("../../models/Role");
const RoleService_1 = require("../../services/RoleService");
const Trouble_1 = require("../../models/Trouble");
const requestValidationService = new RequestValidationService_1.RequestValidationService();
const roleService = new RoleService_1.RoleService();
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
        var troublesArray = new Array();
        // Get troubles
        const troublePromises = troubles.map((troubleId) => __awaiter(void 0, void 0, void 0, function* () {
            var trouble = yield Trouble_1.Trouble.findById(troubleId);
            troublesArray.push(trouble);
        }));
        yield Promise.all(troublePromises);
        // Find user by ID
        const user = yield User_1.User.findById(req.body.user.id);
        const files = req.files;
        // Create incident
        const incident = new Incident_1.Incident({
            description: description,
            picture: files['picture'][0].filename,
            video: files['video'][0].filename,
            audio: files['audio'][0].filename,
            user: user,
            location: location,
            troubles: troublesArray,
        });
        // Get concerned support centers
        const supportCenters = yield incident.getConcernedSupportCenters();
        yield Promise.all(supportCenters);
        // Set support centers
        incident.supportCenters = supportCenters;
        // Save incident
        yield incident.save();
        yield (user === null || user === void 0 ? void 0 : user.incidents.push(incident));
        yield (user === null || user === void 0 ? void 0 : user.save());
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
        // Get isHandled from request body
        const { isHandled } = req.body;
        // Find user by ID
        const user = yield User_1.User.findById(req.body.user.id);
        if (user) {
            yield Role_1.Role.findOne({ name: 'supportCenter' })
                .then((role) => __awaiter(void 0, void 0, void 0, function* () {
                if (role) {
                    roleService.checkRole(user, role, res);
                }
            }))
                .catch((reason) => __awaiter(void 0, void 0, void 0, function* () {
                throw reason;
            }));
        }
        // Find incident by ID
        const incident = yield Incident_1.Incident.findById(req.params.incidentId);
        if (incident) {
            // Get Connected supportCenter
            const supportCenter = yield SupportCenter_1.SupportCenter.findOne({ user: user });
            // Update incident notification
            const notification = yield Notification_1.Notification.findOne({ incident: incident._id, supportCenter: supportCenter });
            if (notification) {
                notification.isHandled = isHandled;
                yield notification.save();
                // Send response
                if (isHandled) {
                    notification.state = 'prise en charge en cours';
                    yield notification.save();
                    return res.status(201).json({ message: 'Incident handled successfully!' });
                }
                else {
                    if (supportCenter) {
                        const index = incident.supportCenters.indexOf(supportCenter);
                        const _supportCenter = yield incident.getNextNearestSupportCenter(supportCenter);
                        incident.supportCenters.splice(index, 1);
                        incident.supportCenters.push(_supportCenter);
                        yield incident.save();
                    }
                    return res.status(201).json({ message: 'Incident declined successfully!' });
                }
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while incident handling' });
    }
});
exports.handleIncident = handleIncident;
const updateIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);
        // Get form values from body
        const { description, troubles, latitude, longitude } = req.body;
        const incident = yield Incident_1.Incident.findById(req.params.incidentId);
        const files = req.files;
        if (incident) {
            const notification = yield Notification_1.Notification.findOne({
                state: 'prise en charge en cours',
                incident: incident
            });
            if (notification) {
                return res.status(401).json({ message: 'Can\'t update. Incident support has already begin' });
            }
            else {
                if (description)
                    incident.description = description;
                if (troubles)
                    incident.troubles = troubles;
                if (latitude)
                    incident.location.latitude = latitude;
                if (longitude)
                    incident.location.longitude = longitude;
                if (files[0]) {
                    incident.picture = files[0].filename;
                }
                if (files[1]) {
                    incident.video = files[1].filename;
                }
                incident.updatedAt = yield new Date();
                // Get concerned support centers
                const supportCenters = yield incident.getConcernedSupportCenters();
                // Set support centers
                incident.supportCenters = supportCenters;
                yield incident.save();
                return res.status(404).json({ message: 'Incident updated succesfully' });
            }
        }
        else {
            return res.status(404).json({ error: 'Incident not found' });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while updating incident' });
    }
});
exports.updateIncident = updateIncident;
const getIncidentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const incidentId = req.params.incidentId;
        yield Incident_1.Incident.findById(incidentId).populate('location').populate('user').populate('supportCenters').populate('troubles')
            .then((incident) => __awaiter(void 0, void 0, void 0, function* () {
            return res.status(200).json({ incident: incident });
        }))
            .catch((error) => __awaiter(void 0, void 0, void 0, function* () {
            throw error;
        }));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error getting incident details' });
    }
});
exports.getIncidentDetails = getIncidentDetails;
const notificationState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);
        // Find user by ID
        const user = yield User_1.User.findById(req.body.user.id);
        // Find incident by ID
        const incident = yield Incident_1.Incident.findById(req.params.incidentId);
        // Get state from request body
        const { state } = req.body;
        // Get Connected supportCenter
        const supportCenter = yield SupportCenter_1.SupportCenter.findOne({ user: user });
        Notification_1.Notification.findOneAndUpdate({
            supportCenter: supportCenter,
            incident: incident,
        }, {
            state: state,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while changing handling status' });
    }
});
exports.notificationState = notificationState;
const getSupportCenterIncidents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);
        // Find user by ID
        const user = yield User_1.User.findById(req.body.user);
        // Find support center by ID
        const supportCenter = yield SupportCenter_1.SupportCenter.findById(req.params.supportCenterId);
        // Get incidents of support center
        const incidents = yield (supportCenter === null || supportCenter === void 0 ? void 0 : supportCenter.incidents);
        // Send response
        return res.json({ incidents: incidents });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while fetching support center incidents' });
    }
});
exports.getSupportCenterIncidents = getSupportCenterIncidents;
const getUserIncidents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);
        // Get incidents of support center
        const incidents = yield Incident_1.Incident.find({ user: req.params.userId })
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
exports.getUserIncidents = getUserIncidents;
