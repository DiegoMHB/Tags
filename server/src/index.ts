import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/db";
import router from "./router";
import { deleteExpiredPosts } from "./dev/helperFuncions";



const app = express();
const port = 3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(router)

async function connectDB() {
    try {
        await db.authenticate();
        await db.sync().then(()=>{
            deleteExpiredPosts();
            console.log("Database Actualized")
        });
        console.log("Connected with DB")
    } catch (e) {
        console.log("Connection with DB not succeeded: ", e)

    }
}

connectDB()

app.listen(port, () => {
    console.log(`Example app listening on port  http://localhost:${port}`)
});