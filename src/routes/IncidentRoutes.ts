import * as express from 'express';
import { body } from "express-validator";
import * as incidentController from '../controllers/IncidentController';

export const incidentRouter = express.Router();

// Report an incident
incidentRouter.post('/report',
    [
        body('description').isEmpty()
    ],
    incidentController.reportIncident,
);