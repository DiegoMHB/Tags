import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
import path from "node:path";


dotenv.config();


const db = new Sequelize(process.env.DATABASE_URL!, {
    models: [path.join(__dirname, '/../models/**/*.ts')], 
});

export default db;