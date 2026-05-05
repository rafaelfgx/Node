import { describe, expect, test } from "vitest";
import { randomUUID } from "node:crypto";
import CustomerValidator from "#src/customer/customer.validator.js";

describe("CustomerValidator", () => {
    describe("full", () => {
        test("should fail when payload is empty", () => {
            expect(CustomerValidator.full.safeParse({}).success).toBe(false);
        });

        test("should fail when name is too short", () => {
            expect(CustomerValidator.full.safeParse({ name: "N" }).success).toBe(false);
        });

        test("should succeed when id and name are valid", () => {
            expect(CustomerValidator.full.safeParse({ id: randomUUID(), name: "Name" }).success).toBe(true);
        });
    });

    describe("create", () => {
        test("should fail when payload is empty", () => {
            expect(CustomerValidator.create.safeParse({}).success).toBe(false);
        });

        test("should fail when name is too short", () => {
            expect(CustomerValidator.create.safeParse({ name: "N" }).success).toBe(false);
        });

        test("should succeed when name is valid", () => {
            expect(CustomerValidator.create.safeParse({ name: "Name" }).success).toBe(true);
        });
    });

    describe("update", () => {
        test("should fail when payload is empty", () => {
            expect(CustomerValidator.update.safeParse({}).success).toBe(false);
        });

        test("should fail when name is too short", () => {
            expect(CustomerValidator.update.safeParse({ name: "N" }).success).toBe(false);
        });

        test("should succeed when id and name are valid", () => {
            expect(CustomerValidator.update.safeParse({ id: randomUUID(), name: "Name" }).success).toBe(true);
        });
    });
});
