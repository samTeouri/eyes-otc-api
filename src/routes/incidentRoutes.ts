import * as express from 'express';
import { body } from "express-validator";
import * as incidentController from '../controllers/incidentController';

export const incidentRouter = express.Router();

// Report an incident
incidentRouter.post('/report', [
    body('date').notEmpty(),
    body('state').notEmpty(),
], incidentController.reportIncident);