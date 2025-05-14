import dotenv from 'dotenv';

dotenv.config();

export const config: IConfig = {
    JWT_SECRET : process.env.JWT_SECRET || 'secret',
    REFRESH_SECRET : process.env.REFRESH_SECRET  || 'refresh_secret',
    JWT_EXPIRATION : process.env.JWT_EXPIRATION || '1h',
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/archiTech',
    OPEN_AI_KEY: process.env.OPEN_AI_KEY ||'',
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
    PORT: parseInt(process.env.PORT || '5000'),
}
interface IConfig {
    JWT_SECRET: string;
    REFRESH_SECRET: string;
    JWT_EXPIRATION: string; 
    MONGO_URI: string;
    OPEN_AI_KEY: string;
    PORT: number;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string; 
}