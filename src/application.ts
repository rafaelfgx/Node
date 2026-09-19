import express, { json, urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import customerRouter from "./customer/customer.router.js";

export default express()
    .use(helmet(), cors(), json(), urlencoded({ extended: true }))
    .get("/", (_, response) => response.sendStatus(200))
    .get("/favicon.ico", (_, response) => response.sendStatus(204))
    .use("/customers", customerRouter);
