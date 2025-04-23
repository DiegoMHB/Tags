import dotenv from "dotenv";
dotenv.config();
import app from "./app"
import db from "./config/db";

import { createPosts, deleteExpiredPosts } from "./dev/InitializersFunctions";
import { deleteDefaultPosts } from "./dev/InitializersFunctions";
import { Populate } from "./dev/InitializersFunctions";



const port = process.env.PORT



async function connectDB() {
    try {
        await db.authenticate();
        await db.sync()
            // TODO: CLOSE EXPIRED POSTS 
            // .then(() => Populate())//-- DEV --
            // .then(() => {
            //     if(port === "3000")
            //     deleteExpiredPosts();
            //     deleteDefaultPosts();
            //     console.log("Database:::: deleted expired and default Posts")
            // })
            // .then(() => {
            //     createPosts();
            //     console.log("Database::: new default Posts created")
            // })
        console.log("Connected with DB")
        app.listen(port, () => {
            console.log(`Example app listening on port  https://localhost:${port}`)
        });
    } catch (e) {
        console.log("Connection with DB not succeeded: ", e)

    }
}

connectDB()


