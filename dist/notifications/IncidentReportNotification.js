"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentReportNotification = void 0;
class IncidentReportNotification {
    constructor(user) {
        this.title = "Nouveau signalement !";
        this.body = `Un nouvel incident a été signalé par l'utilisateur ${user.firstName} ${user.lastName}.`;
    }
}
exports.IncidentReportNotification = IncidentReportNotification;
