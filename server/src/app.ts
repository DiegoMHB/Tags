import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./router";

const app = express();


app.use(cors({
    origin: ["http://localhost:5173","https://transcendent-taffy-8552e6.netlify.app"],
    // origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    METHODS:["GET","POST","PATCH","DELETE"]
}));
app.options('*', (req, res) => {
    const origin = req.headers.origin;
    if (["http://localhost:5173","https://transcendent-taffy-8552e6.netlify.app"].includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Cache-Control', 'no-store');
    res.status(204).end();
});

app.use(cookieParser())
app.use(bodyParser.json());
app.use(router)

export default app;


