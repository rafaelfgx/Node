import { Request, Response } from "express";
import { z, ZodError } from "zod";
import validatorMiddleware from "../../src/shared/validator.middleware";

describe("ValidatorMiddleware", () => {
    const schema = z.object({ name: z.string() });

    const responseMock: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
    };

    const nextMock = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    it("invalid: type", () => {
        validatorMiddleware(schema)({ body: { name: 123 } } as Request, responseMock as Response, nextMock);
        expect(responseMock.status).toHaveBeenCalledWith(400);
        expect(responseMock.json).toHaveBeenCalledWith(expect.any(ZodError));
        expect(nextMock).not.toHaveBeenCalled();
    });

    it("invalid: required", () => {
        validatorMiddleware(schema)({ body: {} } as Request, responseMock as Response, nextMock);
        expect(responseMock.status).toHaveBeenCalledWith(400);
        expect(nextMock).not.toHaveBeenCalled();
    });

    it("valid", () => {
        validatorMiddleware(schema)({ body: { name: "Name" } } as Request, responseMock as Response, nextMock);
        expect(responseMock.status).not.toHaveBeenCalled();
        expect(responseMock.json).not.toHaveBeenCalled();
        expect(nextMock).toHaveBeenCalled();
    });
});
