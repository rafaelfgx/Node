import Data from "../data";
import CustomerRepository from "../../src/customer/customer.repository";
import CustomerService from "../../src/customer/customer.service";

describe("CustomerService", () => {
    const customerRepositoryMock = jest.mocked(new CustomerRepository());
    const customerService = new CustomerService(customerRepositoryMock);

    describe("List", () => {
        it("should return empty list", async () => {
            customerRepositoryMock.list = jest.fn().mockResolvedValue([]);
            const result = await customerService.list();
            expect(customerRepositoryMock.list).toHaveBeenCalledTimes(1);
            expect(result).toEqual([]);
        });

        it("should return list", async () => {
            customerRepositoryMock.list = jest.fn().mockResolvedValue([Data.customer]);
            const result = await customerService.list();
            expect(customerRepositoryMock.list).toHaveBeenCalledTimes(1);
            expect(result).toEqual([Data.customer]);
        });

        it("should return list", async () => {
            const customerRepository = {
                ...jest.requireActual<CustomerRepository>("../../src/customer/customer.repository"),
                list: jest.fn().mockResolvedValue([Data.customer])
            } as unknown as jest.Mocked<CustomerRepository>;
            const result = await new CustomerService(customerRepository).list();
            expect(customerRepository.list).toHaveBeenCalledTimes(1);
            expect(result).toEqual([Data.customer]);
        });

        test.each([
            { name: "should return empty list", customers: [] },
            { name: "should return list", customers: [Data.customer] }
        ])("$name", async ({ customers }) => {
            customerRepositoryMock.list = jest.fn().mockResolvedValue(customers);
            const result = await customerService.list();
            expect(customerRepositoryMock.list).toHaveBeenCalledTimes(1);
            expect(result).toEqual(customers);
        });
    });

    describe("Get", () => {
        it("should return null", async () => {
            customerRepositoryMock.get = jest.fn().mockResolvedValue(null);
            const result = await customerService.get(Data.customer.id);
            expect(customerRepositoryMock.get).toHaveBeenCalledTimes(1);
            expect(result).toBeNull();
        });

        it("should return object", async () => {
            customerRepositoryMock.get = jest.fn().mockResolvedValue(Data.customer);
            const result = await customerService.get(Data.customer.id);
            expect(customerRepositoryMock.get).toHaveBeenCalledTimes(1);
            expect(result).toEqual(Data.customer);
        });
    });

    describe("Add", () => {
        it("should add object", async () => {
            customerRepositoryMock.add = jest.fn().mockResolvedValue(Data.customer.id);
            const result = await customerService.add(Data.customer);
            expect(customerRepositoryMock.add).toHaveBeenCalledTimes(1);
            expect(result).toBe(Data.customer.id);
        });
    });

    describe("Update", () => {
        it("should update object", async () => {
            customerRepositoryMock.update = jest.fn().mockResolvedValue(undefined);
            await customerService.update(Data.customer);
            expect(customerRepositoryMock.update).toHaveBeenCalledTimes(1);
        });
    });

    describe("Remove", () => {
        it("should remove object", async () => {
            customerRepositoryMock.remove = jest.fn().mockResolvedValue(undefined);
            await customerService.remove(Data.customer.id);
            expect(customerRepositoryMock.remove).toHaveBeenCalledTimes(1);
        });
    });
});
