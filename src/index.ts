import { app } from './app';
import { connect, sequelize } from './config/database';
import { Incident } from './models/Incident';
import { SupportCenter } from './models/SupportCenter';
import { Notification } from './models/Notification';
import * as http from 'http';
import { Location } from './models/Location';
import { User } from './models/User';
import { Trouble } from './models/Trouble';
import { IncidentTrouble } from './models/IncidentTrouble';
import { Service } from './models/Service';

connect();

Incident.belongsToMany(SupportCenter, {
    through: Notification,
    foreignKey: 'supportCenterId'
});
SupportCenter.belongsToMany(Incident, {
    through: Notification,
    foreignKey: 'incidentId'
});

Incident.belongsToMany(Trouble, {
    through: IncidentTrouble,
    foreignKey: 'troubleId'
});
Trouble.belongsToMany(Incident, {
    through: IncidentTrouble,
    foreignKey: 'incidentId'
});

Location.hasOne(Incident, {
    foreignKey: 'locationId'
});

Location.hasOne(SupportCenter, {
    foreignKey: 'locationId'
});

Incident.belongsTo(User,{
    foreignKey: 'userId'
});

SupportCenter.belongsTo(Service,{
    foreignKey: 'serviceId'
});

sequelize.sync({force: true})
    .then(() => {
        console.log('Database synchronised successfully');
    })
    .catch((error) => {
        console.error(`Database synchronisation failed : ${error}`);
    });

const httpServer = http.createServer(app);
const port = process.env.PORT;

httpServer.listen(port, () => {
    console.log(`Serveur disponible sur le port ${port}`);
});