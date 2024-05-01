import express, { Application } from 'express';
import { incidentRouter } from "./routes/IncidentRoutes";
import { authRoutes } from './routes/AuthRoutes';
import * as database from './config/database';
import cors from 'cors';
import { OSMRoutingService } from './services/OSMRoutingService';

export const app: Application = express();

const osrm = new OSMRoutingService();

database.connect();

database.sequelize.sync({force: true})
        .then(() => {
            console.log('Database synchronised successfully');
        })
        .catch((error) => {
            console.error(`Database synchronisation failed : ${error}`);
        });

osrm.getDistance(8.9886, 1.1357, 8.9744, 8.1361);

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
// Incident routes
app.use('/incidents', incidentRouter);

// Authentication routes
app.use('/auth', authRoutes);