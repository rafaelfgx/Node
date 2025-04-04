import CustomerRepository from "../../src/customer/customer.repository";

describe("CustomerRepository", () => {
    const customerRepository = new CustomerRepository();

    it("list should return empty array", async () => {
        expect(await customerRepository.list()).toEqual([]);
    });

    it("list should return array", async () => {
        await customerRepository.add({ id: "", name: "Name" });
        expect(await customerRepository.list()).toHaveLength(1);
    });
});
