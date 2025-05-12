import CustomerValidator from "../../src/customer/customer.validator";

describe("CustomerValidator", () => {
    describe("Add", () => {
        test("invalid", () => expect(CustomerValidator.add.validate({ name: "N" }).error).toBeDefined());
        test("valid", () => expect(CustomerValidator.add.validate({ name: "Name" }).error).toBeUndefined());
    });

    describe("Update", () => {
        test("invalid", () => expect(CustomerValidator.update.validate({ name: "Name" }).error).toBeDefined());
        test("valid", () => expect(CustomerValidator.update.validate({ id: "1", name: "Name" }).error).toBeUndefined());
    });
});
