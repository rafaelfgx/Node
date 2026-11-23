import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export default function validatorMiddleware(schema: ZodType) {
    return (request: Request, response: Response, next: NextFunction): void => {
        const result = schema.safeParse(request.body);

        if (result.success) {
            request.body = result.data;
            next();
            return;
        }

        const errors = result.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message
        }));

        response.status(400).json({ errors });
    };
}
