import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`mongodb+srv://amitpundir992:bankokhumayenge@cluster0.dsydjpl.mongodb.net/${DB_NAME}`);
    console.log("Mongodb connected || host: ",connectionInstance.connection.host);
  } catch (error) {
    console.log("MONGODB connection Failed", error);
    process.exit(1);
  }
};

export { connectDB };
