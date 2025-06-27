import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export default function validatorMiddleware(schema: Joi.ObjectSchema) {
    return (request: Request, response: Response, next: NextFunction): void => {
        const { error } = schema.validate(request.body);
        if (error) response.status(400).json(error.details);
        else next();
    };
}
