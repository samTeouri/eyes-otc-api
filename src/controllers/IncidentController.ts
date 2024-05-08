import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Incident } from '../models/Incident';
import { ITrouble, Trouble } from '../models/Trouble';
import { User } from '../models/User';
import { Notification } from '../models/Notification';
import { SupportCenter } from '../models/SupportCenter';
import { handleSingleUploadImage } from '../utils/UploadImage';
import { handleSingleUploadVideo } from '../utils/UploadVideo';
import { UploadedFile } from '../utils/UploadedFile';
import { RequestValidationService } from '../services/RequestValidationService';

const requestValidationService = new RequestValidationService();

export const reportIncident = async (req: Request, res: Response) => {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);

        // Get form values from body
        const { description, troubles } = req.body;

        // Handle file uploads
        let uploadImageResult: UploadedFile = await handleSingleUploadImage(req, res);
        let uploadVideoResult: UploadedFile = await handleSingleUploadVideo(req, res);

        // Find user by ID
        const user = await User.findById(req.body.user.id);

        // Create incident
        const incident = new Incident({
            description: description,
            picture: uploadImageResult.path,
            video: uploadVideoResult.path,
        });

        // Set troubles
        troubles.forEach(async (trouble: ITrouble) => {
            await incident.troubles.push(trouble as ITrouble);
        });

        // Get concerned support centers
        const supportCenters = await incident.getConcernedSupportCenters();

        // Set support centers
        incident.supportCenters = supportCenters;

        // Save incident
        await incident.save();

        return res.status(201).json({ message: 'Incident reported successfully!' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while reporting incident' });
    }
}

export const handleIncident = async (req: Request, res: Response) => {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);

        // Find user by ID
        const user = await User.findById(req.body.user.id);

        // Get isHandled from request body
        const { isHandled } = req.body;

        // Find incident by ID
        const incident = await Incident.findById(req.params.incidentId);

        // Update incident notification
        const notification = await Notification.findOne({ incident: incident?._id });
        if (notification) {
            notification.isHandled = isHandled;
            await notification.save();
        }

        // Send response
        if (isHandled) {
            return res.status(201).json({ message: 'Incident handled successfully!' });
        } else {
            return res.status(201).json({ message: 'Incident declined successfully!' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while incident handling' });
    }
}

export const getSupportCenterIncidents = async (req: Request, res: Response) => {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);

        // Find user by ID
        const user = await User.findById(req.body.user);

        // Find support center by ID
        const supportCenter = await SupportCenter.findById(req.params.supportCenterId);

        // Get incidents of support center
        const incidents = await Incident.find({ supportCenters: supportCenter?._id });

        // Send response
        return res.json({ incidents: incidents });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while fetching support center incidents' });
    }
}