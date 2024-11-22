import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

//bcrypt and compare password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//JWT tokens
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

export const Data = mongoose.model("data", userSchema);
