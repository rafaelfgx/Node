import { Request, Response } from "express";
import Joi from "joi";

export const validate = (schema: Joi.ObjectSchema) => (request: Request, response: Response) => {
    const result = schema.validate(request.body);

    if (result.error) {
        response.status(400).json(result.error.details);
    }
};

export default validate;
