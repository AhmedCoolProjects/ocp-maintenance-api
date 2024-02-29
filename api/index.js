import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cron from "node-cron";
import router from "./routers/index.js";
import {
  checkDailyTasks,
  checkMonthlyTasksBefore,
  checkTwoWeeksTasksBefore,
  checkTwoWeeksTasksFinal,
} from "./functions/tasks.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
// const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://maintenance-ocp.vercel.app",
      "https://maintenance-ocp.vercel.app/",
      "https://ocp.ahmedbargady.me",
      "https://ocp.ahmedbargady.me/"
    ],
    methods: ["GET", "POST"],
  })
);

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connected");
    app.use("/api", router);
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT);
      // daily tasks checking
      cron.schedule("0 0 * * *", () => {
        console.log("running check every day at 00:00");
        checkDailyTasks();
      });
      // two weeks tasks checking for waiting to required
      cron.schedule("0 0 14 * *", () => {
        console.log("running check every 14 days at 00:00");
        checkTwoWeeksTasksBefore();
      });
      // two weeks tasks checking for all to waiting
      cron.schedule("0 0 15 * *", () => {
        console.log("running check every 15 days at 00:00");
        checkTwoWeeksTasksFinal();
      });
      // monthly tasks checking for waiting to required
      cron.schedule("0 0 1 * *", () => {
        console.log("running check every 1st day at 00:00");
        checkMonthlyTasksBefore();
      });
      // monthly tasks checking for all to waiting
      cron.schedule("0 0 2 * *", () => {
        console.log("running check every 2nd day at 00:00");
        checkMonthlyTasksFinal();
      });
    });
  });
