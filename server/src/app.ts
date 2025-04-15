import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./router";

const app = express();


app.use(cors({
    origin: "http://localhost:5173",
    // origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    METHODS:["GET","POST","PATCH","DELETE"]
}));
app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Cache-Control', 'no-store');  // Esto evita el cacheo
    res.status(204).end(); // Responde sin contenido, pero con los headers
});
app.use(cookieParser())
app.use(bodyParser.json());
app.use(router)

export default app;


