import express, { Application } from 'express';
import { incidentRouter } from "./routes/IncidentRoutes";
import { authRoutes } from './routes/AuthRoutes';
import * as database from './config/database';
import cors from 'cors';

export const app: Application = express();

(async () => {
    await database.connect();

    await database.sequelize.sync({force: true})
            .then(() => {
                console.log('Database synchronised successfully');
            })
            .catch((error) => {
                console.error(`Database synchronisation failed : ${error}`);
            });
})();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
// Incident routes
app.use('/incidents', incidentRouter);

// Authentication routes
app.use('/auth', authRoutes);