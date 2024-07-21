import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validate = (schema: Joi.ObjectSchema) => (request: Request, response: Response, next: NextFunction) => {
    const result = schema.validate(request.body);

    if (result.error) {
        return response.status(400).json(result.error.details);
    }

    return next();
};

export default validate;
