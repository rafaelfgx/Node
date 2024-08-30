import express, { Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { connectMongoDB } from "./shared/mongodb";
import customerRouter from "./customer/customer.router";

dotenv.config();
connectMongoDB();
const application = express();
application.use(helmet());
application.use(cors());
application.use(express.json());
application.use(express.urlencoded({ extended: true }));
application.get("/", (_: Request, response: Response) => response.status(200).send());
application.get("/favicon.ico", (_: Request, response: Response) => response.status(204).send());
application.use("/customers/", customerRouter);
application.listen(3000, () => console.log(`Running: http://localhost:3000`));
