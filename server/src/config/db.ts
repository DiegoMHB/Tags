import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
import path from "node:path";


dotenv.config();


const db = new Sequelize(process.env.DATABASE_URL!, {
    dialect: 'postgres', 
    models: [path.join(__dirname, '/../models')], 
});

export default db;