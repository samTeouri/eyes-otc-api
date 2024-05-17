import express, { Application } from 'express';
import * as database from './config/database';
import cors from 'cors';
import bodyParser from 'body-parser';

(async () => {
    try {
        // Connect to the database
        await database.connect();
        console.log('Database connected successfully');
    } catch (error) {
        console.error(`Database connection failed: ${error}`);
    }
})();

import { incidentRouter } from "./routes/IncidentRoutes";
import { authRoutes } from './routes/AuthRoutes';
import { troubleRouter } from './routes/TroubleRoutes';
import { supportCenterRouter } from './routes/SupportCenterRoutes';
import { userRouter } from './routes/UserRoutes';

export const app: Application = express();

// Middlewares
app.use(cors());

// Parse request and put data in body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// Incident routes
app.use('/incidents', incidentRouter);

// Authentication routes
app.use('/auth', authRoutes);

// Trouble routes
app.use('/troubles', troubleRouter);

// Support Centers routes
app.use('/supportCenter', supportCenterRouter);

// Users routes
app.use('/user', userRouter);