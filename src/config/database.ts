import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import { Sequelize } from 'sequelize';

dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USERNAME as string, process.env.DB_PASSWORD as string, {
    host: 'localhost',
    dialect: 'postgres'
});

export const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connexion à la base de données effectuée avec succès.');
    } catch (error) {
        console.error("Connexion à la base de données échouée.\nfermeture du processus ...", error);
        process.exit(1);
    }
}