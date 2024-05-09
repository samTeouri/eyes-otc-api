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
Object.defineProperty(exports, "__esModule", { value: true });
exports.incidentRouter = void 0;
const express = __importStar(require("express"));
const express_validator_1 = require("express-validator");
const incidentController = __importStar(require("../controllers/IncidentController"));
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
exports.incidentRouter = express.Router();
// Report an incident
exports.incidentRouter.post('/report', [
    (0, express_validator_1.body)('description').exists()
], AuthMiddleware_1.authVerifyToken, incidentController.reportIncident);
// Handle an incident
exports.incidentRouter.post('/handle/:incidentId', [
    (0, express_validator_1.body)('isHandled').exists()
], AuthMiddleware_1.authVerifyToken, incidentController.handleIncident);
// Handle an incident
exports.incidentRouter.post('/update/:incidentId', AuthMiddleware_1.authVerifyToken, incidentController.updateIncident);
// Get incidents associated to supportCenter
exports.incidentRouter.get('/index/supportCenter/:supportCenterId', AuthMiddleware_1.authVerifyToken, incidentController.getSupportCenterIncidents);
// Change incident handling status
exports.incidentRouter.post('/handleStatus/:incidentId', AuthMiddleware_1.authVerifyToken, incidentController.notificationState);
// Get incidents reported by user
exports.incidentRouter.get('/index/user/:userId', AuthMiddleware_1.authVerifyToken, incidentController.getUserIncidents);
