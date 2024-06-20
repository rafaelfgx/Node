import express, { Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { connectMongo } from "./shared/database";
import customerRouter from "./customer/customer.router";

dotenv.config();
connectMongo();
const application = express();
application.use(helmet());
application.use(cors());
application.use(express.json());
application.use(express.urlencoded({ extended: true }));
application.get("/", (_: Request, response: Response) => response.status(200).send());
application.use("/customers/", customerRouter);

export default application;
