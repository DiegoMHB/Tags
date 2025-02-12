import express from 'express';
import dotenv from 'dotenv'
import db from './config/db';
import router from './router';

dotenv.config();

const app = express();
const port = 3000;

app.use(router)

async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
        console.log("Connected with DB")
    } catch (e) {
        console.log("Connection with DB not succeeded: ",e)

    }
}

connectDB()

app.listen(port, () => {
    console.log(`Example app listening on port  http://localhost:${port}`)
});