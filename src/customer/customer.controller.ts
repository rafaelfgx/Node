import { Request, Response } from "express";
import CustomerService from "./customer.service.js";

export default class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    list = async (_request: Request, response: Response) => {
        const result = await this.customerService.list();
        response.status(result.length ? 200 : 404).json(result);
    };

    get = async (request: Request, response: Response) => {
        const result = await this.customerService.get(request.params["id"] as string);
        response.status(result ? 200 : 404).json(result);
    };

    create = async (request: Request, response: Response) => {
        const result = await this.customerService.create(request.body);
        response.status(201).json(result);
    };

    update = async (request: Request, response: Response) => {
        await this.customerService.update({ id: request.params["id"], ...request.body });
        response.sendStatus(204);
    };

    delete = async (request: Request, response: Response) => {
        await this.customerService.delete(request.params["id"] as string);
        response.sendStatus(204);
    };
}
