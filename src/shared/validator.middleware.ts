import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export default function validatorMiddleware(schema: ZodSchema) {
    return (request: Request, response: Response, next: NextFunction): void => {
        const result = schema.safeParse(request.body);
        if (result.error) { response.status(400).json(result.error); } else { next(); }
    }
}
