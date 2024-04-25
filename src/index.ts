import { app } from './app';
import * as database from './config/database';
import * as http from 'http';

database.connect();

(async () => {
    await database.sequelize.sync({force: true})
        .then(() => {
            console.log('Database synchronised successfully');
        })
        .catch((error) => {
            console.error(`Database synchronisation failed : ${error}`);
        });
})();

const httpServer = http.createServer(app);
const port = process.env.PORT;

httpServer.listen(port, () => {
    console.log(`Serveur disponible sur le port ${port}`);
});