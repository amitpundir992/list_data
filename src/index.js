import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import express from "express";
import { Data } from "./models/user.model.js";

const app = express();


dotenv.config({
  path: "./.env",
});

app.get("/get-data", async (req, res) => {
  try {
    const allUsers = await Data.find(); 
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);   
  }
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
