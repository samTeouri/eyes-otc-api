import express, { Application } from 'express';

export const app: Application = express();

// Middleware
app.use(express.json());

// Routes

