import { config } from "dotenv";
import mongoose from "mongoose";
config();

const connectionString = process.env.MONGO_URI as string;
mongoose.set('strictQuery',false)

mongoose.connect(connectionString)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', (error as Error).message)
  })