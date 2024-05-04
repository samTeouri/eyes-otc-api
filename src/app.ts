import express, { Application } from 'express';
import { incidentRouter } from "./routes/IncidentRoutes";
import { authRoutes } from './routes/AuthRoutes';
import * as database from './config/database';
import cors from 'cors';
import path from 'path';
import ejs from 'ejs';

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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
// Incident routes
app.use('/incidents', incidentRouter);

// Authentication routes
app.use('/auth', authRoutes);