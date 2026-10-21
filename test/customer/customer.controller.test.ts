import { vi, describe, it, expect } from "vitest";
import { Request, Response } from "express";
import Data from "#test/data.js";
import CustomerRepository from "#src/customer/customer.repository.js";
import CustomerService from "#src/customer/customer.service.js";
import CustomerController from "#src/customer/customer.controller.js";

describe("CustomerController", () => {
    const customerRepositoryMock = vi.mocked(new CustomerRepository());
    const customerServiceMock = vi.mocked(new CustomerService(customerRepositoryMock));
    const customerController = new CustomerController(customerServiceMock);

    const createResponseMock = (): Response => {
        const response = {} as Response;
        response.status = vi.fn().mockImplementation(() => response);
        response.json = vi.fn().mockImplementation(() => response);
        response.sendStatus = vi.fn().mockImplementation(() => response);
        return response;
    };

    describe("List", () => {
        it("should return 404", async () => {
            const responseMock = createResponseMock();
            customerServiceMock.list = vi.fn().mockResolvedValue([]);
            await customerController.list({} as Request, responseMock);
            expect(responseMock.status).toHaveBeenCalledWith(404);
            expect(responseMock.json).toHaveBeenCalledWith([]);
        });

        it("should return 200", async () => {
            const responseMock = createResponseMock();
            customerServiceMock.list = vi.fn().mockResolvedValue([Data.customer]);
            await customerController.list({} as Request, responseMock);
            expect(responseMock.status).toHaveBeenCalledWith(200);
            expect(responseMock.json).toHaveBeenCalledWith([Data.customer]);
        });
    });

    describe("Get", () => {
        it("should return 404", async () => {
            const requestMock = { params: { id: Data.id } } as Partial<Request> as Request;
            const responseMock = createResponseMock();
            customerServiceMock.get = vi.fn().mockResolvedValue(null);
            await customerController.get(requestMock, responseMock);
            expect(responseMock.status).toHaveBeenCalledWith(404);
            expect(responseMock.json).toHaveBeenCalledWith(null);
        });

        it("should return 200", async () => {
            const requestMock = { params: { id: Data.customer.id } } as Partial<Request> as Request;
            const responseMock = createResponseMock();
            customerServiceMock.get = vi.fn().mockResolvedValue(Data.customer);
            await customerController.get(requestMock, responseMock);
            expect(responseMock.status).toHaveBeenCalledWith(200);
            expect(responseMock.json).toHaveBeenCalledWith(Data.customer);
        });
    });

    describe("Add", () => {
        it("should return 201", async () => {
            const requestMock = { body: Data.customerWithoutId } as Partial<Request> as Request;
            const responseMock = createResponseMock();
            customerServiceMock.create = vi.fn().mockResolvedValue(Data.customer.id);
            await customerController.create(requestMock, responseMock);
            expect(responseMock.status).toHaveBeenCalledWith(201);
            expect(responseMock.json).toHaveBeenCalledWith(Data.customer.id);
        });
    });

    describe("Update", () => {
        it("should return 204", async () => {
            const requestMock = { params: { id: Data.customer.id }, body: Data.customer } as Partial<Request> as Request;
            const responseMock = createResponseMock();
            customerServiceMock.update = vi.fn().mockReturnThis();
            await customerController.update(requestMock, responseMock);
            expect(responseMock.sendStatus).toHaveBeenCalledWith(204);
        });
    });

    describe("Remove", () => {
        it("should return 204", async () => {
            const requestMock = { params: { id: Data.customer.id } } as Partial<Request> as Request;
            const responseMock = createResponseMock();
            customerServiceMock.delete = vi.fn().mockReturnThis();
            await customerController.delete(requestMock, responseMock);
            expect(responseMock.sendStatus).toHaveBeenCalledWith(204);
        });
    });
});
