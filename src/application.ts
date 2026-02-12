import express, { json, Request, Response, urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import customerRouter from "./customer/customer.router";

export default express()
    .use([helmet(), cors(), json(), urlencoded({ extended: true })])
    .get("/", (_: Request, response: Response) => { response.sendStatus(200); })
    .get("/favicon.ico", (_: Request, response: Response) => { response.sendStatus(204); })
    .use("/customers/", customerRouter);
