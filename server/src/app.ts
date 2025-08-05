import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./router";

const app = express();


app.use(cors({
    origin: ["http://localhost:5173","https://thetaggers.netlify.app/"],
    credentials: true,
    methods:["GET","POST","PATCH","DELETE"]
}));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(router)

export default app;


