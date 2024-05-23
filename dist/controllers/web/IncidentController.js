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
exports.handleIncident = void 0;
const RequestValidationService_1 = require("../../services/RequestValidationService");
const Incident_1 = require("../../models/Incident");
const Notification_1 = require("../../models/Notification");
const requestValidationService = new RequestValidationService_1.RequestValidationService();
const handleIncident = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get session data
        const session = req.session;
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);
        // Get isHandled from request body
        const { isHandled } = req.body;
        // Find incident by ID
        const incident = yield Incident_1.Incident.findById(req.params.incidentId);
        if (incident) {
            // Get Connected supportCenter
            const supportCenter = session.supportCenter;
            // Update incident notification
            const notification = yield Notification_1.Notification.findOneAndUpdate({
                incident: incident._id,
                supportCenter: supportCenter
            }, {
                isHandled: isHandled
            });
            if (notification) {
                // Send response
                if (isHandled) {
                    yield incident.supportCenters.push(supportCenter);
                    req.session.successMessage = 'Incident pris en charge avec succès';
                    return res.redirect('/incidents');
                }
                else {
                    if (supportCenter) {
                        const _supportCenter = yield incident.getNextNearestSupportCenter(supportCenter);
                        yield Notification_1.Notification.create({
                            supportCenter: _supportCenter,
                            incident: incident,
                        });
                    }
                    req.session.successMessage = 'Prise en charge de l\'incident déclinée avec succès';
                    return res.redirect('/incidents');
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
