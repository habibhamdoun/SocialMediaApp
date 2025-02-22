import mongoose from "mongoose";

const connectDb = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB is connected");
  });
  await mongoose.connect(`${process.env.MONGODB_URL}/auth`);
};

export default connectDb;
