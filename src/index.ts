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
import { Support } from './models/Support';

connect();

Incident.belongsToMany(SupportCenter, {
    through: Notification,
    foreignKey: 'incidentId'
});
SupportCenter.belongsToMany(Incident, {
    through: Notification,
    foreignKey: 'supportCenterId'
});

Incident.belongsToMany(Trouble, {
    through: IncidentTrouble,
    foreignKey: 'incidentId'
});
Trouble.belongsToMany(Incident, {
    through: IncidentTrouble,
    foreignKey: 'troubleId'
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

Service.belongsToMany(Trouble, {
    through: Support,
    foreignKey: 'serviceId'
});
Trouble.belongsToMany(Service, {
    through: Support,
    foreignKey: 'troubleId'
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