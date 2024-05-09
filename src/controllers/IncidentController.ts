import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Incident } from '../models/Incident';
import { ITrouble, Trouble } from '../models/Trouble';
import { User } from '../models/User';
import { Notification } from '../models/Notification';
import { ISupportCenter, SupportCenter } from '../models/SupportCenter';
import { handleFilesUpload } from '../utils/UploadFile';
import { UploadedFile } from '../utils/UploadedFile';
import { RequestValidationService } from '../services/RequestValidationService';
import { Location } from '../models/Location';
import { IRole, Role } from '../models/Role';
import { RoleService } from '../services/RoleService';

const requestValidationService = new RequestValidationService();
const roleService = new RoleService();

export const reportIncident = async (req: Request, res: Response) => {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);

        // Get form values from body
        const { description, troubles, latitude, longitude } = req.body;

        // Create Location
        const location = await Location.create({
            latitude: latitude,
            longitude: longitude,
        });

        // Handle file uploads
        let uploadPictureResult: UploadedFile = await handleFilesUpload(req, res);

        // Find user by ID
        const user = await User.findById(req.body.user.id);

        // Create incident
        const incident = new Incident({
            description: description,
            picture: uploadPictureResult.path,
            user: user,
            location: location,
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

        // Get isHandled from request body
        const { isHandled } = req.body;

        // Find user by ID
        const user = await User.findById(req.body.user.id);

        if (user) {
            await Role.findOne({ name: 'supportCenter' })
                .then(async (role: IRole | null) => {
                    if (role) {
                        roleService.checkRole(user, role, res);
                    }
                })
                .catch(async (reason: any) => {
                    throw reason;
                });
        }

        // Find incident by ID
        const incident = await Incident.findById(req.params.incidentId);

        if (incident) {
            // Get Connected supportCenter
            const supportCenter = await SupportCenter.findOne({ user: user });

            // Update incident notification
            const notification = await Notification.findOne({ incident: incident._id, supportCenter: supportCenter });
            if (notification) {
                notification.isHandled = isHandled;
                await notification.save();
                // Send response
                if (isHandled) {
                    notification.state = 'prise en charge en cours';
                    await notification.save();
                    return res.status(201).json({ message: 'Incident handled successfully!' });
                } else {
                    if (supportCenter) {
                        const index = incident.supportCenters.indexOf(supportCenter);
                        const _supportCenter = await incident.getNextNearestSupportCenter(supportCenter);
                        incident.supportCenters.splice(index, 1);
                        incident.supportCenters.push(_supportCenter as ISupportCenter);
                        await incident.save();
                    }
                    return res.status(201).json({ message: 'Incident declined successfully!' });
                }
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while incident handling' });
    }
}

export const notificationState = async (req: Request, res: Response) => {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);

        // Find user by ID
        const user = await User.findById(req.body.user.id);

        // Find incident by ID
        const incident = await Incident.findById(req.params.incidentId);

        // Get state from request body
        const { state } = req.body;

        // Get Connected supportCenter
        const supportCenter = await SupportCenter.findOne({ user: user });

        Notification.findOneAndUpdate(
            {
                supportCenter: supportCenter,
                incident: incident,
            },
            {
                state: state,
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while changing handling status' });
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
        const incidents = await Incident.find({ supportCenters: supportCenter?._id })
                .populate('location')
                .populate('user')
                .populate('troubles')
                .populate('supportCenters');

        // Send response
        return res.json({ incidents: incidents });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while fetching support center incidents' });
    }
}