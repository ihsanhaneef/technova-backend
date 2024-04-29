
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

import quizRouter from "./quiz.js";
import level2Router from "./level2.js";
import level3Router from "./level3.js";
import { adminRouter } from "./routes/admin.js";
import { userRoute } from "./routes/user.js";
import { eventoverRouter } from "./routes/eventover.js";

const app = express();

const connectDB = async () => {
  try {
    const CONNECTION_URL = process.env?.DB_URL;
    console.log("CONNNECTING TO DATABASE..............");
    const conn = await mongoose.connect(CONNECTION_URL);
    console.log(`Mongo db connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

app.use(bodyParser.json());
app.use(cors());

// Use the quiz router
app.use("/api/admin", adminRouter);
app.use("/api/user", userRoute);
app.use("/api/eventover",eventoverRouter );
app.use("/api/quiz", quizRouter);
app.use("/api/level2", level2Router);
app.use("/api/level3", level3Router);

const PORT = 7000; // Listen only on localhost
// connectDB();
// app.listen(PORT, "localhost", () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
connectDB();
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
