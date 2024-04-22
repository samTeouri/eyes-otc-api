import { app } from './app';
import * as database from './config/database';
import * as http from 'http';
import { Notification } from './models/Notification';
import { SupportCenter } from './models/SupportCenter';
import { Incident } from './models/Incident';

database.connect();
const httpServer = http.createServer(app);
const port = process.env.PORT;

httpServer.listen(port, () => {
    console.log(`Serveur disponible sur le port ${port}`);
});