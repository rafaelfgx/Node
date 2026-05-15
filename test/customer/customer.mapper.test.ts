import { describe, it, expect } from "vitest";
import Data from "#test/data.js";
import CustomerMapper from "#src/customer/customer.mapper.js";

describe("CustomerMapper", () => {
    describe("toEntity", () => {
        it("should return null when source is undefined", () => {
            expect(CustomerMapper.toEntity(undefined)).toBeNull();
        });

        it("should return null when source is null", () => {
            expect(CustomerMapper.toEntity(null)).toBeNull();
        });

        it("should map document to entity when source is valid", () => {
            expect(CustomerMapper.toEntity(Data.customerDocument)).toEqual(Data.customer);
        });
    });

    describe("toDto", () => {
        it("should return null when source is undefined", () => {
            expect(CustomerMapper.toDto(undefined)).toBeNull();
        });

        it("should return null when source is null", () => {
            expect(CustomerMapper.toDto(null)).toBeNull();
        });

        it("should map entity to dto when source is valid", () => {
            expect(CustomerMapper.toDto(Data.customer)).toEqual(Data.customer);
        });
    });
});
