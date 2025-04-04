import { randomUUID } from "crypto";
import CustomerRepository from "../../src/customer/customer.repository";
import CustomerService from "../../src/customer/customer.service";

describe("CustomerService", () => {
    const customerRepositoryMock = jest.mocked(new CustomerRepository());
    let customerService: CustomerService;

    beforeEach(() => {
        jest.clearAllMocks();
        customerService = new CustomerService(customerRepositoryMock);
    });

    it("list should not return customers", async () => {
        customerRepositoryMock.list = jest.fn().mockResolvedValue([]);
        const result = await customerService.list();
        expect(customerRepositoryMock.list).toHaveBeenCalledTimes(1);
        expect(result).toEqual([]);
    });

    it("list should return customers", async () => {
        const customers = [{ id: randomUUID(), name: "Customer" }];

        const customerRepository = {
            ...jest.requireActual<CustomerRepository>("../../src/customer/customer.repository"),
            list: jest.fn().mockResolvedValue(customers)
        } as unknown as jest.Mocked<CustomerRepository>;

        const result = await new CustomerService(customerRepository).list();

        expect(customerRepository.list).toHaveBeenCalledTimes(1);
        expect(result).toEqual(customers);
    });

    it("list should return customers", async () => {
        const customers = [{ id: randomUUID(), name: "Customer" }];
        customerRepositoryMock.list = jest.fn().mockResolvedValue(customers);
        const result = await customerService.list();
        expect(customerRepositoryMock.list).toHaveBeenCalledTimes(1);
        expect(result).toEqual(customers);
    });

    test.each([
        {
            description: "should not return customers",
            customers: []
        },
        {
            description: "should return customers",
            customers: [
                { id: randomUUID(), name: "Customer 1" },
                { id: randomUUID(), name: "Customer 2" }
            ]
        }
    ])("list: %s", async ({ customers }) => {
        customerRepositoryMock.list = jest.fn().mockResolvedValue(customers);
        const result = await customerService.list();
        expect(customerRepositoryMock.list).toHaveBeenCalledTimes(1);
        expect(result).toEqual(customers);
    });
});
