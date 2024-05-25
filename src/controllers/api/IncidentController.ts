import { Request, Response } from 'express';
import { Incident } from '../../models/Incident';
import { User } from '../../models/User';
import { Notification } from '../../models/Notification';
import { SupportCenter } from '../../models/SupportCenter';
import { RequestValidationService } from '../../services/RequestValidationService';
import { Location } from '../../models/Location';
import { RoleService } from '../../services/RoleService';
import { ITrouble, Trouble } from '../../models/Trouble';

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

        var troublesArray: ITrouble[] = new Array();

        // Get troubles
        const troublePromises = troubles.map(async (troubleId: string) => {
            var trouble = await Trouble.findById(troubleId);
            troublesArray.push(trouble as ITrouble);
        });

        await Promise.all(troublePromises);

        // Find user by ID
        const user = await User.findById(req.body.user.id);

        const files = req.files as {[fieldname: string]: Express.Multer.File[]};

        let incident = new Incident({
            description: description,
            user: user,
            location: location,
            troubles: troublesArray,
        });

        // Create incident
        if (files['audio']) {
            incident.audio = files['audio'][0].filename;
        }
        
        if (files['picture']) {
            incident.video = files['video'][0].filename;
        }
        
        if (files['video']) {
            incident.video = files['video'][0].filename;
        }

        // Get concerned support centers
        const supportCenters = await incident.getConcernedSupportCenters();

        await Promise.all(supportCenters);

        // Notify support centers
        for (const supportCenter of supportCenters) {
            await Notification.create({
                supportCenter: supportCenter,
                incident: incident,
            });
        }

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

export const updateIncident = async (req: Request, res: Response) => {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);

        // Get form values from body
        const { description, troubles, latitude, longitude } = req.body;
        
        const incident = await Incident.findById(req.params.incidentId);

        const files = req.files as Express.Multer.File[];

        if (incident) {
            if (description) incident.description = description;
            if (troubles) incident.troubles = troubles;
            if (latitude) incident.location.latitude = latitude;
            if (longitude) incident.location.longitude = longitude;
            if (files[0]) {
                incident.picture = files[0].filename;
            }
            if (files[1]) {
                incident.video = files[1].filename;
            }
            incident.updatedAt = await new Date();

            // Get concerned support centers
            const supportCenters = await incident.getConcernedSupportCenters();

            // Set support centers
            incident.supportCenters = supportCenters;

            await incident.save()
            return res.status(404).json({ message: 'Incident updated succesfully' });
        } else {
            return res.status(404).json({ error: 'Incident not found' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while updating incident' });
    }
}

export const getIncidentDetails = async (req: Request, res: Response) => {
    try {
        const incidentId = req.params.incidentId;

        await Incident.findById(incidentId).populate('location').populate('user').populate('supportCenters').populate('troubles')
            .then(async (incident) => {
                return res.status(200).json({ incident: incident })
            })
            .catch(async (error) => {
                throw error;
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error getting incident details' });
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