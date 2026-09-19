import { vi, describe, it, expect, beforeEach } from "vitest";
import { Request, Response } from "express";
import { z } from "zod";
import validatorMiddleware from "#src/shared/validator.middleware.js";

describe("ValidatorMiddleware", () => {
    const schema = z.object({ name: z.string() });
    let statusMock: ReturnType<typeof vi.fn>;
    let jsonMock: ReturnType<typeof vi.fn>;
    let response: Response;
    const next = vi.fn();

    beforeEach(() => {
        jsonMock = vi.fn();
        statusMock = vi.fn(() => ({ json: jsonMock }));
        response = { status: statusMock } as unknown as Response;
    });

    it("invalid: type", () => {
        validatorMiddleware(schema)({ body: { name: 123 } } as Request, response, next);
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith({ errors: [{ path: "name", message: "Invalid input: expected string, received number" }] });
        expect(next).not.toHaveBeenCalled();
    });

    it("invalid: required", () => {
        validatorMiddleware(schema)({ body: {} } as Request, response, next);
        expect(statusMock).toHaveBeenCalledWith(400);
        expect(jsonMock).toHaveBeenCalledWith({ errors: [{ path: "name", message: "Invalid input: expected string, received undefined" }] });
        expect(next).not.toHaveBeenCalled();
    });

    it("valid", () => {
        const request = { body: { name: "Name" } } as Request;
        validatorMiddleware(schema)(request, response, next);
        expect(statusMock).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
        expect(request.body).toEqual(request.body);
    });
});
