import { app } from './app';
import * as database from './config/database';
import { Incident } from './models/Incident';
import { SupportCenter } from './models/SupportCenter';
import { Notification } from './models/Notification';
import * as http from 'http';
import { Trouble } from './models/Trouble';
import { IncidentTrouble } from './models/IncidentTrouble';
import { Service } from './models/Service';
import { Support } from './models/Support';

database.connect();

SupportCenter.belongsToMany(Incident, {
    through: Notification,
    foreignKey: 'supportCenterId'
});

Trouble.belongsToMany(Incident, {
    through: IncidentTrouble,
    foreignKey: 'troubleId'
});

Trouble.belongsToMany(Service, {
    through: Support,
    foreignKey: 'troubleId'
});

database.sequelize.sync({force: true})
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