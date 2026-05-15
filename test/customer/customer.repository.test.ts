import { describe, it, expect } from "vitest";
import Data from "#test/data.js";
import CustomerRepository from "#src/customer/customer.repository.js";

describe("CustomerRepository", () => {
    const customerRepository = new CustomerRepository();

    describe("List", () => {
        it("should return empty list", async () => {
            expect(await customerRepository.list()).toEqual([]);
        });

        it("should return list", async () => {
            await customerRepository.create(Data.customer);
            expect(await customerRepository.list()).toHaveLength(1);
        });
    });

    describe("Get", () => {
        it("should return null for unknown id", async () => {
            expect(await customerRepository.get(Data.id)).toBeNull();
        });

        it("should return object", async () => {
            const id = await customerRepository.create(Data.customer);
            expect(await customerRepository.get(id)).toBeDefined();
        });
    });

    describe("Add", () => {
        it("should add object", async () => {
            expect(await customerRepository.create(Data.customer)).toBeDefined();
        });
    });

    describe("Update", () => {
        it("should ignore for unknown id", async () => {
            expect(await customerRepository.update(Data.customer)).toBeUndefined();
        });

        it("should update object", async () => {
            const id = await customerRepository.create(Data.customer);
            expect(await customerRepository.get(id)).toBeDefined();
            await customerRepository.update({ id, name: "Updated" });
            expect((await customerRepository.get(id))?.name).toBe("Updated");
        });
    });

    describe("Remove", () => {
        it("should ignore for unknown id", async () => {
            expect(await customerRepository.delete(Data.id)).toBeUndefined();
        });

        it("should remove object", async () => {
            const id = await customerRepository.create(Data.customer);
            expect(await customerRepository.get(id)).toBeDefined();
            await customerRepository.delete(id);
            expect(await customerRepository.get(id)).toBeNull();
        });
    });
});
