import { model, Schema } from "mongoose";
import Customer from "./customer.entity";

export default model<Customer>("Customers", new Schema<Customer>({
    name: { type: String, required: true, trim: true, minlength: 3, maxlength: 250 }
}, { versionKey: false }));
