import express, { Application } from 'express';
import { incidentRouter } from "./routes/IncidentRoutes";
import { authRoutes } from './routes/AuthRoutes';
import * as database from './config/database';
import cors from 'cors';
import path from 'path';

export const app: Application = express();

(async () => {
    try {
        // Connect to the database
        await database.connect();
        console.log('Database connected successfully');
    } catch (error) {
        console.error(`Database connection failed: ${error}`);
    }
})();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
// Incident routes
app.use('/incidents', incidentRouter);

// Authentication routes
app.use('/auth', authRoutes);