import mongoose from "mongoose";

mongoose.set("toJSON", {
    virtuals: true,
    transform: (_, record) => {
        record.id = record._id;
        delete record._id;
        delete record.__v;
    }
});

export const connectMongoDB = async () => await mongoose.connect(process.env.MONGODB_URL ?? "");
