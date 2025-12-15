import Data from "../data";
import CustomerMapper from "../../src/customer/customer.mapper";

describe("CustomerMapper", () => {
    describe("DTO", () => {
        it("should return null if source is undefined", () => expect(CustomerMapper.toDto(undefined)).toBeNull());
        it("should return null if source is null", () => expect(CustomerMapper.toDto(null)).toBeNull());
        it("should return object if source is not null", () => expect(CustomerMapper.toDto(Data.customer)).toEqual(Data.customer));
    });
});
