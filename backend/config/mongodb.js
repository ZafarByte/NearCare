import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/NearCare`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error("MongoDB connection failed: ", error.message);
    process.exit(1); // exit if DB connection fails
  }
};

export default connectDB;
