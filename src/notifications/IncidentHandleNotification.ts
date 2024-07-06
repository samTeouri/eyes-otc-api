import { Notification } from "firebase-admin/lib/messaging/messaging-api";
import { ISupportCenter } from "../models/SupportCenter";

export class IncidentHandleNotification implements Notification {
    #title: string;
    #body: string;
    imageUrl?: string;

    constructor(supportCenter: ISupportCenter) {
        this.#title = "Votre incident a été prit en charge.";
        this.#body = `${supportCenter.name} sera sur les lieux dans quelques instants. Veuillez garder votre calme`;
    }
}