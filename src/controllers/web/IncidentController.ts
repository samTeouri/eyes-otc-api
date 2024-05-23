import { Request, Response } from "express";
import { RequestValidationService } from "../../services/RequestValidationService";
import { Incident } from "../../models/Incident";
import { Notification } from "../../models/Notification";
import { ISupportCenter } from "../../models/SupportCenter";

const requestValidationService = new RequestValidationService();

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
            const supportCenter = session.supportCenter

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
                if (isHandled) {
                    await incident.supportCenters.push(supportCenter as ISupportCenter);
                    req.session.successMessage = 'Incident pris en charge avec succès';
                    return res.redirect('/incidents');
                } else {
                    if (supportCenter) {
                        const _supportCenter = await incident.getNextNearestSupportCenter(supportCenter);
                        await Notification.create({
                            supportCenter: _supportCenter,
                            incident: incident,
                        });
                    }
                    req.session.successMessage = 'Prise en charge de l\'incident déclinée avec succès';
                    return res.redirect('/incidents');
                }
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while incident handling' });
    }
}