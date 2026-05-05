import { vi, describe, it, expect, test, type Mocked } from "vitest";
import Data from "#test/data.js";
import CustomerRepository from "#src/customer/customer.repository.js";
import CustomerService from "#src/customer/customer.service.js";

describe("CustomerService", () => {
    const customerRepositoryMock = vi.mocked(new CustomerRepository()) as Mocked<CustomerRepository>;
    const customerService = new CustomerService(customerRepositoryMock);

    describe("List", () => {
        it("should return empty list", async () => {
            customerRepositoryMock.list = vi.fn().mockResolvedValue([]);
            const result = await customerService.list();
            expect(customerRepositoryMock.list).toHaveBeenCalledTimes(1);
            expect(result).toEqual([]);
        });

        it("should return list", async () => {
            customerRepositoryMock.list = vi.fn().mockResolvedValue([Data.customer]);
            const result = await customerService.list();
            expect(customerRepositoryMock.list).toHaveBeenCalledTimes(1);
            expect(result).toEqual([Data.customer]);
        });

        it("should return list with actual repository base", async () => {
            const customerRepository = {
                ...(await vi.importActual<CustomerRepository>("#src/customer/customer.repository.js")),
                list: vi.fn().mockResolvedValue([Data.customer])
            } as unknown as Mocked<CustomerRepository>;

            const result = await new CustomerService(customerRepository).list();
            expect(customerRepository.list).toHaveBeenCalledTimes(1);
            expect(result).toEqual([Data.customer]);
        });

        test.each([
            { name: "should return empty list", customers: [] },
            { name: "should return list", customers: [Data.customer] }
        ])("$name", async ({ customers }) => {
            customerRepositoryMock.list = vi.fn().mockResolvedValue(customers);
            const result = await customerService.list();
            expect(customerRepositoryMock.list).toHaveBeenCalledTimes(1);
            expect(result).toEqual(customers);
        });
    });

    describe("Get", () => {
        it("should return null", async () => {
            customerRepositoryMock.get = vi.fn().mockResolvedValue(null);
            const result = await customerService.get(Data.customer.id);
            expect(customerRepositoryMock.get).toHaveBeenCalledTimes(1);
            expect(result).toBeNull();
        });

        it("should return object", async () => {
            customerRepositoryMock.get = vi.fn().mockResolvedValue(Data.customer);
            const result = await customerService.get(Data.customer.id);
            expect(customerRepositoryMock.get).toHaveBeenCalledTimes(1);
            expect(result).toEqual(Data.customer);
        });
    });

    describe("Add", () => {
        it("should add object", async () => {
            customerRepositoryMock.create = vi.fn().mockResolvedValue(Data.customer.id);
            const result = await customerService.create(Data.customer);
            expect(customerRepositoryMock.create).toHaveBeenCalledTimes(1);
            expect(result).toBe(Data.customer.id);
        });
    });

    describe("Update", () => {
        it("should update object", async () => {
            customerRepositoryMock.update = vi.fn().mockResolvedValue(undefined);
            await customerService.update(Data.customer);
            expect(customerRepositoryMock.update).toHaveBeenCalledTimes(1);
        });
    });

    describe("Remove", () => {
        it("should remove object", async () => {
            customerRepositoryMock.delete = vi.fn().mockResolvedValue(undefined);
            await customerService.delete(Data.customer.id);
            expect(customerRepositoryMock.delete).toHaveBeenCalledTimes(1);
        });
    });
});
