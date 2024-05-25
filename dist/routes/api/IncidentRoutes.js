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
exports.incidentApiRouter = void 0;
const express = __importStar(require("express"));
const incidentController = __importStar(require("../../controllers/api/IncidentController"));
const AuthMiddlewares_1 = require("../../middlewares/AuthMiddlewares");
const FilesUploadMiddleware_1 = require("../../middlewares/FilesUploadMiddleware");
exports.incidentApiRouter = express.Router();
// Report an incident
exports.incidentApiRouter.post('/report', FilesUploadMiddleware_1.uploadFile.fields([{ name: 'picture', maxCount: 1 }, { name: 'video', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), AuthMiddlewares_1.authVerifyApiToken, incidentController.reportIncident);
// Update an incident
exports.incidentApiRouter.post('/update/:incidentId', FilesUploadMiddleware_1.uploadFile.fields([{ name: 'picture', maxCount: 1 }, { name: 'video', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), AuthMiddlewares_1.authVerifyApiToken, incidentController.updateIncident);
// Get incident details
exports.incidentApiRouter.get('/:incidentId', AuthMiddlewares_1.authVerifyApiToken, incidentController.getIncidentDetails);
// Get incidents associated to supportCenter
exports.incidentApiRouter.get('/index/supportCenter/:supportCenterId', AuthMiddlewares_1.authVerifyApiToken, incidentController.getSupportCenterIncidents);
// Change incident handling status
exports.incidentApiRouter.post('/handleStatus/:incidentId', AuthMiddlewares_1.authVerifyApiToken, incidentController.notificationState);
// Get incidents reported by user
exports.incidentApiRouter.get('/index/user/:userId', AuthMiddlewares_1.authVerifyApiToken, incidentController.getUserIncidents);
