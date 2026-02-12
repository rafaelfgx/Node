import { Request, Response } from "express";
import Data from "../data";
import CustomerRepository from "../../src/customer/customer.repository";
import CustomerService from "../../src/customer/customer.service";
import CustomerController from "../../src/customer/customer.controller";

describe("CustomerController", () => {
    const customerRepositoryMock = jest.mocked(new CustomerRepository());
    const customerServiceMock = jest.mocked(new CustomerService(customerRepositoryMock));
    const controller = new CustomerController(customerServiceMock);

    const responseMock: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
        sendStatus: jest.fn().mockReturnThis()
    };

    describe("List", () => {
        it("should return 404", async () => {
            customerServiceMock.list = jest.fn().mockResolvedValue([]);
            await controller.list({} as Request, responseMock as Response);
            expect(responseMock.status).toHaveBeenCalledWith(404);
            expect(responseMock.json).toHaveBeenCalledWith([]);
        });

        it("should return 200", async () => {
            customerServiceMock.list = jest.fn().mockResolvedValue([Data.customer]);
            await controller.list({} as Request, responseMock as Response);
            expect(responseMock.status).toHaveBeenCalledWith(200);
            expect(responseMock.json).toHaveBeenCalledWith([Data.customer]);
        });
    });

    describe("Get", () => {
        it("should return 404", async () => {
            customerServiceMock.get = jest.fn().mockResolvedValue(null);
            await controller.get({ params: { id: Data.id } } as unknown as Request, responseMock as Response);
            expect(responseMock.status).toHaveBeenCalledWith(404);
            expect(responseMock.json).toHaveBeenCalledWith(null);
        });

        it("should return 200", async () => {
            customerServiceMock.get = jest.fn().mockResolvedValue(Data.customer);
            await controller.get({ params: { id: Data.customer.id } } as unknown as Request, responseMock as Response);
            expect(responseMock.status).toHaveBeenCalledWith(200);
            expect(responseMock.json).toHaveBeenCalledWith(Data.customer);
        });
    });

    describe("Add", () => {
        it("should return 201", async () => {
            customerServiceMock.add = jest.fn().mockResolvedValue(Data.customer.id);
            await controller.add({ body: Data.customerWithoutId } as unknown as Request, responseMock as Response);
            expect(responseMock.status).toHaveBeenCalledWith(201);
            expect(responseMock.json).toHaveBeenCalledWith(Data.customer.id);
        });
    });

    describe("Update", () => {
        it("should return 204", async () => {
            customerServiceMock.update = jest.fn().mockReturnThis();
            await controller.update({ params: { id: Data.customer.id }, body: Data.customer } as unknown as Request, responseMock as Response);
            expect(responseMock.sendStatus).toHaveBeenCalledWith(204);
        });
    });

    describe("Remove", () => {
        it("should return 204", async () => {
            customerServiceMock.remove = jest.fn().mockReturnThis();
            await controller.remove({ params: { id: Data.customer.id } } as unknown as Request, responseMock as Response);
            expect(responseMock.sendStatus).toHaveBeenCalledWith(204);
        });
    });
});
