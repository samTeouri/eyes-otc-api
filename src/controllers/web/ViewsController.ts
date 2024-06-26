import ejs from "ejs";
import { Request, Response } from "express"
import path from "path";
import { IIncident, Incident } from "../../models/Incident";
import { Notification } from "../../models/Notification";

export const getDashboard = async (req: Request, res: Response) => {
    return res.render('pages/main', {
        content: await ejs.renderFile(path.join(__dirname, '../../../views/pages', 'dashboard.ejs'))
    });
}

export const getMap = async (req: Request, res: Response) => {

    // Get session data
    const session: any = req.session

    // Get support center notifications
    const notifications = await Notification.find({ supportCenter: session.supportCenter._id });

    let incidents = [];

    for (const notification of notifications) {
        const incident = await Incident.findById(notification.incident).populate('user').populate('location').populate('troubles').populate('supportCenters');

        let incidentStatus = 'En cours';

        if (notification.state == 'résolu') {
            incidentStatus = 'Résolu';
        } else if (notification.state == 'en attente de prise en charge') {
            incidentStatus = 'En attente'
        }

        const incidentResult = {
            id: incident?._id,
            description: incident?.description,
            picture: incident?.picture,
            video: incident?.video,
            audio: incident?.audio,
            location: incident?.location,
            user: incident?.user,
            troubles: incident?.troubles,
            supportCenters: incident?.supportCenters,
            createdAt: incident?.createdAt,
            updatedAt: incident?.updatedAt,
            status: incidentStatus
        }

        incidents.push(incidentResult);
    }

    return res.render('pages/main', {
        content: await ejs.renderFile(path.join(__dirname, '../../../views/pages', 'map.ejs'), {
            incidents: incidents,
        })
    });
}

export const getIncidents = async (req: Request, res: Response) => {
    // Get session data
    const session: any = req.session

    // Get support center notifications
    const notifications = await Notification.find({ supportCenter: session.supportCenter._id });

    let incidents = [];

    for (const notification of notifications) {
        const incident = await Incident.findById(notification.incident).populate('user').populate('location').populate('troubles').populate('supportCenters');
        
        // const incidentNotifications = await Notification.find({ incident: incident });
        
        // const incidentHandledNotifications = await incidentNotifications.filter((notification) => notification.isHandled);
        
        // const incidentResolvedNotifications = await incidentNotifications.filter((notification) => {
        //     if (notification.state = 'résolu') return true;
        //     return false;
        // });

        // let incidentStatus = 'En attente'

        // if (incidentResolvedNotifications.length === incidentHandledNotifications.length) {
        //     incidentStatus = 'Résolu'
        // } else {
        //     if (incidentHandledNotifications.length > 0) {
        //         incidentStatus = 'En cours';
        //     }
        // }

        let incidentStatus = 'En cours';

        if (notification.state == 'résolu') {
            incidentStatus = 'Résolu';
        } else if (notification.state == 'en attente de prise en charge') {
            incidentStatus = 'En attente'
        }

        const incidentResult = {
            id: incident?._id,
            description: incident?.description,
            picture: incident?.picture,
            video: incident?.video,
            audio: incident?.audio,
            location: incident?.location,
            user: incident?.user,
            troubles: incident?.troubles,
            supportCenters: incident?.supportCenters,
            createdAt: incident?.createdAt,
            updatedAt: incident?.updatedAt,
            status: incidentStatus
        }
        incidents.push(incidentResult);
        
    }

    return res.render('pages/main', {
        content: await ejs.renderFile(path.join(__dirname, '../../../views/pages', 'incidents.ejs'), {
            incidents: incidents
        }),
    });
}