import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

export const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_URI as string);
        console.log('Connection to database established successfully.');
    } catch (error) {
        console.error("Connection to database failed:", error);
        process.exit(1);
    }
};
