import express, { json, Request, Response, urlencoded } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import MongoService from "./shared/mongo.service";
import customerRouter from "./customer/customer.router";

dotenv.config();
MongoService.connect();

export default express()
    .use([helmet(), cors(), json(), urlencoded({ extended: true })])
    .get("/", (_: Request, response: Response) => { response.sendStatus(200); })
    .get("/favicon.ico", (_: Request, response: Response) => { response.sendStatus(204); })
    .use("/customers/", customerRouter);
