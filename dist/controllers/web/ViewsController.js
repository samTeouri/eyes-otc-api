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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIncidents = exports.getMap = exports.getDashboard = void 0;
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const Incident_1 = require("../../models/Incident");
const Notification_1 = require("../../models/Notification");
const User_1 = require("../../models/User");
const getDashboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Données statistiques du dashboard
    if (req.session.supportCenter) {
        let supportCenterNotifications = yield Notification_1.Notification.find({ supportCenter: req.session.supportCenter });
        let incidentsCount = supportCenterNotifications.length;
        let incidentsResolved = supportCenterNotifications.filter(notification => notification.state === 'résolu').length;
        let incidentsInCharge = supportCenterNotifications.filter(notification => notification.state === 'prise en charge en cours').length;
        let usersCount = (yield User_1.User.find()).length;
        let dashboardData = {
            incidentsCount: incidentsCount,
            incidentsResolved: incidentsResolved,
            incidentsInCharge: incidentsInCharge,
            usersCount: usersCount
        };
        return res.render('pages/main', {
            content: yield ejs_1.default.renderFile(path_1.default.join(__dirname, '../../../views/pages', 'dashboard.ejs'), dashboardData),
        });
    }
    req.session.destroy(err => {
        if (err) {
            return next(err);
        }
        res.redirect('/auth/login');
    });
});
exports.getDashboard = getDashboard;
const getMap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get session data
    const session = req.session;
    // Get support center notifications
    const notifications = yield Notification_1.Notification.find({ supportCenter: session.supportCenter._id });
    let incidents = [];
    for (const notification of notifications) {
        const incident = yield Incident_1.Incident.findById(notification.incident).populate('user').populate('location').populate('troubles').populate('supportCenters');
        let incidentStatus = 'En cours';
        if (notification.state == 'résolu') {
            incidentStatus = 'Résolu';
        }
        else if (notification.state == 'en attente de prise en charge') {
            incidentStatus = 'En attente';
        }
        const incidentResult = {
            id: incident === null || incident === void 0 ? void 0 : incident._id,
            description: incident === null || incident === void 0 ? void 0 : incident.description,
            picture: incident === null || incident === void 0 ? void 0 : incident.picture,
            video: incident === null || incident === void 0 ? void 0 : incident.video,
            audio: incident === null || incident === void 0 ? void 0 : incident.audio,
            location: incident === null || incident === void 0 ? void 0 : incident.location,
            user: incident === null || incident === void 0 ? void 0 : incident.user,
            troubles: incident === null || incident === void 0 ? void 0 : incident.troubles,
            supportCenters: incident === null || incident === void 0 ? void 0 : incident.supportCenters,
            createdAt: incident === null || incident === void 0 ? void 0 : incident.createdAt,
            updatedAt: incident === null || incident === void 0 ? void 0 : incident.updatedAt,
            status: incidentStatus
        };
        incidents.push(incidentResult);
    }
    return res.render('pages/main', {
        content: yield ejs_1.default.renderFile(path_1.default.join(__dirname, '../../../views/pages', 'map.ejs'), {
            incidents: incidents,
        })
    });
});
exports.getMap = getMap;
const getIncidents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get session data
    const session = req.session;
    // Get support center notifications
    const notifications = yield Notification_1.Notification.find({ supportCenter: session.supportCenter._id });
    let incidents = [];
    for (const notification of notifications) {
        const incident = yield Incident_1.Incident.findById(notification.incident).populate('user').populate('location').populate('troubles').populate('supportCenters');
        // const incidentNotifications = await Notification.find({ incident: incident });
        // const incidentHandledNotifications = await incidentNotifications.filter((notification) => notification.isHandled);
        // const incidentResolvedNotifications = await incidentNotifications.filter((notification) => {
        //     if (notification.state = 'résolu') return true;
        //     return false;
        // });
        // let incidentStatus = 'En attente'
        // if (incidentResolvedNotifications.length === incidentHandledNotifications.length) {
        //     incidentStatus = 'Résolu'
        // } else {
        //     if (incidentHandledNotifications.length > 0) {
        //         incidentStatus = 'En cours';
        //     }
        // }
        let incidentStatus = 'En cours';
        if (notification.state == 'résolu') {
            incidentStatus = 'Résolu';
        }
        else if (notification.state == 'en attente de prise en charge') {
            incidentStatus = 'En attente';
        }
        const incidentResult = {
            id: incident === null || incident === void 0 ? void 0 : incident._id,
            description: incident === null || incident === void 0 ? void 0 : incident.description,
            picture: incident === null || incident === void 0 ? void 0 : incident.picture,
            video: incident === null || incident === void 0 ? void 0 : incident.video,
            audio: incident === null || incident === void 0 ? void 0 : incident.audio,
            location: incident === null || incident === void 0 ? void 0 : incident.location,
            user: incident === null || incident === void 0 ? void 0 : incident.user,
            troubles: incident === null || incident === void 0 ? void 0 : incident.troubles,
            supportCenters: incident === null || incident === void 0 ? void 0 : incident.supportCenters,
            createdAt: incident === null || incident === void 0 ? void 0 : incident.createdAt,
            updatedAt: incident === null || incident === void 0 ? void 0 : incident.updatedAt,
            status: incidentStatus
        };
        incidents.push(incidentResult);
    }
    return res.render('pages/main', {
        content: yield ejs_1.default.renderFile(path_1.default.join(__dirname, '../../../views/pages', 'incidents.ejs'), {
            incidents: incidents
        }),
    });
});
exports.getIncidents = getIncidents;
