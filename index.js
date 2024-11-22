import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT =8000;


// Connection
mongoose.connect(`mongodb+srv://amitpundir992:bankokhumayenge@cluster0.dsydjpl.mongodb.net/mongodata`)
        .then(() => console.log("MOngoDB Connected"))
        .catch((err) => console.log("Mongo Error", err));

// Schema
const userSchema = new mongoose.Schema(
  {
    status: {
      type: String,
    },
    credentialTitle: {
      type: String,
    },
    approach: {
      type: String,
      required: true,
    },
    valueProvided: {
      type: String,
    },
    industry: {
      type: String,
      required: true,
    },
    keyBuyer: {
      type: String,
    },
    technologiesUsed: {
      type: String,
    },
    clientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client", // Assuming a reference to a 'Client' model
    },
    projectID: {
      type: String,
      required: true,
    },   
  }
);

const Data = mongoose.model("data", userSchema);

// Middleware - Plugin
app.use(express.urlencoded({ extended : false }))    // helps in taking req.body



app.get("/get-data", async (req, res) => {
  try {
    const allUsers = await Data.find(); 
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);   
  }
});

 
app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
 
