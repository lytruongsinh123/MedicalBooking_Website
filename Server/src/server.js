import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connectdb from "./config/connectdb"
import cors from "cors"
require("dotenv").config();
let app = express();

//config app
app.use(
    cors({
        origin: process.env.URL_REACT, // Chỉ cho phép frontend gọi API
        credentials: true // Cho phép gửi cookies và headers xác thực
    })
);
// Tăng giới hạn payload lên 50mb (hoặc tùy theo nhu cầu)
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
viewEngine(app);
initWebRoutes(app);
connectdb();
let PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> {
    console.log("Backend is running on the port :"+PORT)
})