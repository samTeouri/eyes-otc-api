import { Request, Response } from "express";
import { RequestValidationService } from "../../services/RequestValidationService";
import { Incident } from "../../models/Incident";
import { Notification } from "../../models/Notification";
import { ISupportCenter } from "../../models/SupportCenter";
import { FirebaseCloudMessagingService } from "../../services/FirebaseService";
import { IncidentHandleNotification } from "../../notifications/IncidentHandleNotification";
import { IncidentResolvedNotification } from "../../notifications/IncidentResolvedNotification";

const requestValidationService = new RequestValidationService();
const fcmService = new FirebaseCloudMessagingService();

export const handleIncident = async (req: Request, res: Response) => {
    try {
        // Get session data
        const session: any = req.session

        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);

        // Get isHandled from request body
        const { isHandled } = req.body;

        // Find incident by ID
        const incident = await Incident.findById(req.params.incidentId);

        if (incident) {
            // Get Connected supportCenter
            const supportCenter: ISupportCenter = session.supportCenter
            
            if (isHandled != 2) {
                // Update incident notification
                const notification = await Notification.findOneAndUpdate(
                    {
                        incident: incident._id,
                        supportCenter: supportCenter
                    },
                    {
                        isHandled: isHandled
                    }
                );

                if (notification) {
                    // Send response
                    if (isHandled == 1) {
                        await incident.supportCenters.push(supportCenter as ISupportCenter);
                        notification.state = 'prise en charge en cours';
                        await notification.save();

                        const notificationObject = new IncidentHandleNotification(supportCenter);

                        fcmService.sendNotification(incident.user.fcmToken,  notificationObject);

                        req.session.successMessage = 'Incident pris en charge';
                        return res.redirect('/incidents');
                    } else  if (isHandled == 0) {
                        if (supportCenter) {
                            await Notification.findByIdAndDelete(notification._id)
                            const _supportCenter = await incident.getNextNearestSupportCenter(supportCenter);
                            await Notification.create({
                                supportCenter: _supportCenter,
                                incident: incident,
                            });
                        }
                        req.session.successMessage = 'Prise en charge de l\'incident déclinée';
                        return res.redirect('/incidents');
                    }
                }
            } else {
                const i =await Notification.findOneAndUpdate(
                    {
                        incident: incident._id,
                        supportCenter: supportCenter
                    },
                    {
                        state: 'résolu'
                    }
                );

                const notificationObject = new IncidentResolvedNotification();

                fcmService.sendNotification(incident.user.fcmToken,  notificationObject);

                req.session.successMessage = 'Incident marqué comme résolu';
                return res.redirect('/incidents');
            }
        }
    } catch (error) {
        req.session.errorMessage = 'Erreur lors de la résolution de l\'incident';
        return res.redirect('/incidents');
    }
}