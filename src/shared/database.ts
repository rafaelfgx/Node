import mongoose from "mongoose";

mongoose.set("toJSON", {
    virtuals: true,
    transform: (_, record) => {
        record.id = record._id;
        delete record._id;
        delete record.__v;
    }
});

export const connectMongo = async () => await mongoose.connect(process.env.mongo!);
