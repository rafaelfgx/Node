import Data from "../data";
import CustomerRepository from "../../src/customer/customer.repository";

describe("CustomerRepository", () => {
    const customerRepository = new CustomerRepository();

    describe("List", () => {
        it("should return empty list", async () => {
            expect(await customerRepository.list()).toEqual([]);
        });

        it("should return list", async () => {
            await customerRepository.add(Data.customer);
            expect(await customerRepository.list()).toHaveLength(1);
        });
    });

    describe("Get", () => {
        it("should return null for unknown id", async () => {
            expect(await customerRepository.get(Data.id)).toBeNull();
        });

        it("should return object", async () => {
            const id = await customerRepository.add(Data.customer);
            expect(await customerRepository.get(id)).toBeDefined();
        });
    });

    describe("Add", () => {
        it("should add object", async () => {
            expect(await customerRepository.add(Data.customer)).toBeDefined();
        });
    });

    describe("Update", () => {
        it("should ignore for unknown id", async () => {
            expect(await customerRepository.update(Data.customer)).toBeUndefined();
        });

        it("should update object", async () => {
            const id = await customerRepository.add(Data.customer);
            expect(await customerRepository.get(id)).toBeDefined();
            await customerRepository.update({ id, name: "Updated" });
            expect((await customerRepository.get(id))?.name).toBe("Updated");
        });
    });

    describe("Remove", () => {
        it("should ignore for unknown id", async () => {
            expect(await customerRepository.remove(Data.id)).toBeUndefined();
        });

        it("should remove object", async () => {
            const id = await customerRepository.add(Data.customer);
            expect(await customerRepository.get(id)).toBeDefined();
            await customerRepository.remove(id);
            expect(await customerRepository.get(id)).toBeNull();
        });
    });
});
