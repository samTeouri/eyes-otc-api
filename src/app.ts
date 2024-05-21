import express, { Application } from 'express';
import session, { Session, SessionData } from 'express-session'
import * as database from './config/database';
import cors from 'cors';
import bodyParser from 'body-parser';
import { incidentRouter } from "./routes/api/IncidentRoutes";
import { authRoutes } from './routes/api/AuthRoutes';
import { troubleRouter } from './routes/api/TroubleRoutes';
import { supportCenterRouter } from './routes/api/SupportCenterRoutes';
import { userRouter } from './routes/api/UserRoutes';
import { adminAuthRoutes } from './routes/web/AuthRoutes';
import { viewsRoutes } from './routes/web/ViewsRoutes';
import { IUser } from './models/User';
import { ISupportCenter } from './models/SupportCenter';
import { isAuthenticated } from './middlewares/AuthMiddlewares';
import { setFlashMessages } from './middlewares/FlashMessagesMiddleware';

declare module 'express-session' {
    interface SessionData {
        isAuthenticated: boolean;
        user?: IUser;
        supportCenter?: ISupportCenter;
        successMessage?: string;
        errorMessage?: string;
    }
}

declare module 'express' {
    interface Request {
        session: Session & Partial<SessionData>;
    }
}


(async () => {
    try {
        // Connect to the database
        await database.connect();
        console.log('Database connected successfully');
    } catch (error) {
        console.error(`Database connection failed: ${error}`);
    }
})();

export const app: Application = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set static folders
app.use(express.static('public'));
app.use(express.static('node_modules'));

// Set session
app.use(session({
    secret: 'ANDJ673+=22YvrfdIS2E22AE2eNJKF92',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 5 * 60 * 1000,
    }
}));

// Middleware for checking if user is authenticated
app.use(isAuthenticated);

// Middleware to set flash messages
app.use(setFlashMessages);

// Cross-Origin Middleware
app.use(cors());

// Parse request and put data in body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API Routes
// Incident routes
app.use('/api/incidents', incidentRouter);

// Authentication routes
app.use('/api/auth', authRoutes);

// Trouble routes
app.use('/api/troubles', troubleRouter);

// Support Centers routes
app.use('/api/supportCenter', supportCenterRouter);

// Users routes
app.use('/api/user', userRouter);

// Web Routes
// Authentication Routes
app.use('/auth', adminAuthRoutes);

// Views Routes
app.use('/', viewsRoutes);