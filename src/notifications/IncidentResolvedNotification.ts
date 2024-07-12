import { Notification } from "firebase-admin/lib/messaging/messaging-api";

export class IncidentResolvedNotification implements Notification {
    #title: string;
    #body: string;
    imageUrl?: string;

    constructor() {
        this.#title = "Votre incident a été résolu.";
        this.#body = `L'incident que vous avez signalé à été résolu. Nous vous remercions pour votre coopération.`;
    }
}