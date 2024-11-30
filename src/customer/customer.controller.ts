import { Request, Response } from "express";
import CustomerService from "./customer.service";

export default class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    list = async (_request: Request, response: Response) => {
        const result = await this.customerService.list();
        response.status(result.length ? 200 : 404).json(result.length ? result : undefined);
    };

    get = async (request: Request, response: Response) => {
        const result = await this.customerService.get(request.params["id"] ?? "");
        response.status(result ? 200 : 404).json(result || undefined);
    };

    add = async (request: Request, response: Response) => {
        const result = await this.customerService.add(request.body);
        response.status(201).json(result);
    };

    update = async (request: Request, response: Response) => {
        request.body.id = request.params["id"];
        await this.customerService.update(request.body);
        response.status(200).send();
    };

    remove = async (request: Request, response: Response) => {
        await this.customerService.remove(request.params["id"] ?? "");
        response.status(204).send();
    };
}
