import ejs from "ejs";
import { NextFunction, Request, Response } from "express"
import path from "path";
import { Incident } from "../../models/Incident";
import { INotification, Notification } from "../../models/Notification";
import { User } from "../../models/User";

export const getDashboard = async (req: Request, res: Response, next: NextFunction) => {
    // Données statistiques du dashboard
    if (req.session.supportCenter) {
        let supportCenterNotifications: INotification[] | null = await Notification.find({ supportCenter: req.session.supportCenter });

        let incidentsCount: number = supportCenterNotifications.length;
        let incidentsResolved: number = supportCenterNotifications.filter(notification => notification.state === 'résolu').length;
        let incidentsInCharge: number = supportCenterNotifications.filter(notification => notification.state === 'prise en charge en cours').length;
        let usersCount: number = (await User.find()).length;

        let dashboardData = {
            incidentsCount: incidentsCount,
            incidentsResolved: incidentsResolved,
            incidentsInCharge: incidentsInCharge,
            usersCount: usersCount
        }
    
        return res.render('pages/main', {
            content: await ejs.renderFile(path.join(__dirname, '../../../views/pages', 'dashboard.ejs'), dashboardData),
        });
    }

    req.session.destroy(err => {
        if (err) {
            return next(err);
        }
        res.redirect('/auth/login');
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