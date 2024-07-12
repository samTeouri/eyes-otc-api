import { Notification } from "firebase-admin/lib/messaging/messaging-api";
import { IUser } from "../models/User";

export class IncidentReportNotification implements Notification {
    title: string;
    body: string;
    imageUrl?: string;

    constructor(user: IUser) {
        this.title = "Nouveau signalement !";
        this.body = `Un nouvel incident a été signalé par l'utilisateur ${user.firstName} ${user.lastName}.`;
    }
}