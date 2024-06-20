import * as mongoose from "mongoose";
import Customer from "./customer.entity";

export default mongoose.model(
    "customers",
    new mongoose.Schema<Customer>({
        name: {
            type: String,
            required: true
        }
    })
);
