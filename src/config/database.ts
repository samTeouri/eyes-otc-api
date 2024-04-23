import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USERNAME as string, process.env.DB_PASSWORD as string, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

export const connect = async () => {
    try {
        await sequelize.authenticate();
        await console.log('Connection to database established successfully.');
    } catch (error) {
        console.error("Connection to databse failed.\nclosing process ...", error);
        process.exit(1);
    }
}