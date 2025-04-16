import mongoose from "mongoose";

export default class MongoService {
    static {
        mongoose.set("toJSON", {
            virtuals: true,
            transform: (_, record) => {
                record.id = record._id;
                delete record._id;
            }
        });
    }

    public static async connect() {
        await this.disconnect();
        await mongoose.connect(process.env.MONGODB_URL as string);
    }

    public static async disconnect() {
        await mongoose.disconnect();
    }

    public static async dropDatabase() {
        await mongoose.connection?.db?.dropDatabase();
    }
}
