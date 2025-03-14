import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/db";
import router from "./router";
import { createPosts, deleteExpiredPosts } from "./dev/InitializersFunctions";
import { deleteDefaultPosts } from "./dev/InitializersFunctions";
import { Populate } from "./dev/InitializersFunctions";



const app = express();
const port = process.env.PORT || 5000

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
        await db.sync({force:true})
            .then(() => Populate())//-- DEV --
            .then(() => {
                deleteExpiredPosts();
                deleteDefaultPosts();
                console.log("Database:::: deleted expired and default Posts")
            })
            .then(() => {
                createPosts();
                console.log("Database::: new default Posts created")
            })
        console.log("Connected with DB")
    } catch (e) {
        console.log("Connection with DB not succeeded: ", e)

    }
}

connectDB()

app.listen(port, () => {
    console.log(`Example app listening on port  http://localhost:${port}`)
});