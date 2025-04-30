import { Request, Response } from "express";
import CustomerService from "./customer.service";

export default class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    async list(_request: Request, response: Response) {
        const result = await this.customerService.list();
        response.status(result.length ? 200 : 404).json(result);
    }

    async get(request: Request, response: Response) {
        const result = await this.customerService.get(request.params["id"] as string);
        response.status(result ? 200 : 404).json(result);
    }

    async add(request: Request, response: Response) {
        const result = await this.customerService.add(request.body);
        response.status(201).json(result);
    }

    async update(request: Request, response: Response) {
        request.body.id = request.params["id"];
        await this.customerService.update(request.body);
        response.sendStatus(204);
    }

    async remove(request: Request, response: Response) {
        await this.customerService.remove(request.params["id"] as string);
        response.sendStatus(204);
    }
}
