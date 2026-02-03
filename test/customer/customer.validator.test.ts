import CustomerValidator from "../../src/customer/customer.validator";

describe("CustomerValidator", () => {
    describe("Add", () => {
        test("invalid", () => expect(CustomerValidator.add.safeParse({ name: "N" }).success).toBe(false));
        test("valid", () => expect(CustomerValidator.add.safeParse({ name: "Name" }).success).toBe(true));
    });

    describe("Update", () => {
        test("invalid", () => expect(CustomerValidator.update.safeParse({ name: "Name" }).success).toBe(false));
        test("valid", () => expect(CustomerValidator.update.safeParse({ id: "1", name: "Name" }).success).toBe(true));
    });
});
