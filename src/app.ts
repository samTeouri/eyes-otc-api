import express, { Application } from 'express';
import { incidentRouter } from "./routes/incidentRoutes";
import { authRoutes } from './routes/authRoutes';

export const app: Application = express();

// Middlewares
app.use(express.json());

// Routes
// Incident routes
app.use('/incidents', incidentRouter);

// Authentication routes
app.use('/auth', authRoutes);