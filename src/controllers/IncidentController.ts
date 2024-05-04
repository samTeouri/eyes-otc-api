import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Incident } from "../models/Incident";
import { handleSingleUploadImage } from "../utils/UploadImage";
import { handleSingleUploadVideo } from "../utils/UploadVideo";
import { UploadedFile } from "../utils/UploadedFile";
import { Trouble } from "../models/Trouble";
import { User } from "../models/User";
import { Notification } from "../models/Notification";

export const reportIncident = async (req: Request, res: Response) => {
    // Validate form values and manage errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get form values from body
    const { description, troubles } = req.body;

    let uploadImageResult: UploadedFile;
    let uploadVideoResult: UploadedFile;

    try {
        uploadImageResult = await handleSingleUploadImage(req, res);
        uploadVideoResult = await handleSingleUploadVideo(req, res);
    } catch (e: any) {
        console.log(e.message);
        return res.status(422).json({ message: "Server was unable to process the contained instructions" });
    }

    const user = await User.findByPk(req.body.user);

    if (!user?.hasRole(1)) {
        return res.status(403).json({ error: 'You are not authorized to perform this action' });
    }

    if (user) {
        await user.createIncident(
            {
                description: description,
                picture: uploadImageResult.path,
                video: uploadVideoResult.path,
            }
        ).then(async (incident) => {
            await incident.setTroubles(troubles as (number | Trouble)[]);
        
            const supportCenters = await incident.getConcernedSupportCenters();

            await incident.setSupportCenters(supportCenters);
            res.status(201).json({message: "Incident reported succesfully !"});
        }).catch((reason: any) => {
            console.log(`Error : ${reason}`);
            return res.status(500).json({ error: 'Error while reporting incident' });
        });
    } else {
        return res.status(404).json({ error: 'User not found' });
    }
}

export const handleIncident = async (req: Request, res: Response) => {
    // Validate form values and manage errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const user = await User.findByPk(req.body.user);

        if (!(user?.hasRole(3) || user?.hasRole(2))) {
            return res.status(403).json({ error: 'You are not authorized to perform this action' });
        }

        const { isHandled } = req.body;

        const incident = await Incident.findByPk(req.params.incidentId)
            .then(async (incident: Incident | null) => {
                const notification = await Notification.findOne({ where: { incidentId: incident?.id } });
                notification?.update({ isHandled: isHandled });
                if (isHandled) {
                    res.status(201).json({message: "Incident handled succesfully !"});
                } else {
                    res.status(201).json({message: "Incident declined succesfully !"});
                }
            })
            .catch((reason: any) => {
                console.log(`Error : ${reason}`);
                return res.status(500).json({ error: 'Error while incident handling' });
            });
    } catch (error) {
        
    }

}