import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routers/index.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["*"],
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
    });
  });
