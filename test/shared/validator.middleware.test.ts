import { Request, Response } from "express";
import Joi from "joi";
import validatorMiddleware from "../../src/shared/validator.middleware";

describe("ValidatorMiddleware", () => {
    const schema = Joi.object({ name: Joi.string().required() });
    const responseMock: Partial<Response> = { status: jest.fn().mockReturnThis(), json: jest.fn().mockReturnThis() };
    const nextMock = jest.fn();

    it("invalid: type", () => {
        validatorMiddleware(schema)({ body: { name: 123 } } as Request, responseMock as Response, nextMock);
        expect(responseMock.status).toHaveBeenCalledWith(400);
        expect(responseMock.json).toHaveBeenCalledWith(expect.any(Array));
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
