import express, { Application } from 'express';
import { incidentRouter } from "./routes/incidentRoutes";

export const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use('/incidents', incidentRouter);

