import { Request, Response } from 'express';
import { Incident } from '../models/Incident';
import { ITrouble } from '../models/Trouble';
import { User } from '../models/User';
import { Notification } from '../models/Notification';
import { ISupportCenter, SupportCenter } from '../models/SupportCenter';
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

        // Find user by ID
        const user = await User.findById(req.body.user.id);

        const files = req.files as Express.Multer.File[];

        // Create incident
        const incident = new Incident({
            description: description,
            picture: files[0].filename,
            video: files[1].filename,
            user: user,
            location: location,
            troubles: troubles,
        });

        // Get concerned support centers
        const supportCenters = await incident.getConcernedSupportCenters();

        // Set support centers
        incident.supportCenters = supportCenters;

        // Save incident
        await incident.save();

        await user?.incidents.push(incident);

        await user?.save();

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

export const updateIncident = async (req: Request, res: Response) => {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);

        // Get form values from body
        const { description, troubles, latitude, longitude, picture } = req.body;
        
        const incident = await Incident.findById(req.params.incidentId);

        if (incident) {
            const notification = await Notification.findOne({
                state: 'prise en charge en cours',
                incident: incident
            })

            if (notification) {
                return res.status(401).json({ message: 'Can\'t update. Incident support has already begin' });
            } else {
                if (description) incident.description = description;
                if (troubles) incident.troubles = troubles;
                if (latitude) incident.location.latitude = latitude;
                if (longitude) incident.location.longitude = longitude;
                if (picture) {
                    incident.picture = req.file?.path;
                }
                incident.updatedAt = await new Date();

                // Get concerned support centers
                const supportCenters = await incident.getConcernedSupportCenters();

                // Set support centers
                incident.supportCenters = supportCenters;

                await incident.save()
                return res.status(404).json({ message: 'Incident updated succesfully' });
            }
        } else {
            return res.status(404).json({ error: 'Incident not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while updating incident' });
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
        const incidents = await supportCenter?.incidents;

        // Send response
        return res.json({ incidents: incidents });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while fetching support center incidents' });
    }
}

export const getUserIncidents = async (req: Request, res: Response) => {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);

        // Get incidents of support center
        const incidents = await Incident.find({ user: req.params.userId })
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