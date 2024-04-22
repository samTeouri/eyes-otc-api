import { app } from './app';
import { connect, sequelize } from './config/database';
import { Incident } from './models/Incident';
import { SupportCenter } from './models/SupportCenter';
import { Notification } from './models/Notification';
import * as http from 'http';

connect();

Incident.sync({ force: true });
SupportCenter.sync({ force: true });

Incident.belongsToMany(SupportCenter, { through: Notification });
SupportCenter.belongsToMany(Incident, { through: Notification });

Notification.sync({ force: true });

const httpServer = http.createServer(app);
const port = process.env.PORT;

httpServer.listen(port, () => {
    console.log(`Serveur disponible sur le port ${port}`);
});