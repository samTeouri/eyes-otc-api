import express, { Application } from 'express';
import { incidentRouter } from "./routes/incidentRoutes";
import { authRoutes } from './routes/authRoutes';
import cors from 'cors';

export const app: Application = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
// Incident routes
app.use('/incidents', incidentRouter);

// Authentication routes
app.use('/auth', authRoutes);