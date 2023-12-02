import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoute from "./routes/user.route.js"
import downloadRoute from './routes/download.route.js'
import hardwareRoute from './routes/download.route.js'
import pinoutRoute from './routes/pinout.route.js'
import softwareRoute from './routes/software.route.js'
import tutorialRoute from './routes/tutorial.route.js'
import wiringRoute from './routes/wiring.route.js'
import messageRoute from "./routes/message.route.js";

import authRoute from "./routes/auth.route.js"

import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

mongoose.set("strictQuery", true);
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('\x1b[36m', '➡  MONGO-DB ❗');
    } catch (error) {
        console.log(error);
    }
}
app.use(cors({ origin: "https://dmetronic.netlify.app", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/downloads", downloadRoute);
app.use("/api/hardwares", hardwareRoute);
app.use("/api/softwares", softwareRoute);
app.use("/api/pinouts", pinoutRoute);
app.use("/api/tutorials", tutorialRoute);
app.use("/api/wirings", wiringRoute);
app.use("/api/messages", messageRoute);


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";

    return res.status(errorStatus).send(errorMessage);
});

app.listen("https://dmetronic.netlify.app", () => {
    connect()
    console.log('\x1b[32m', '➡  bckend Run ❗');
});
