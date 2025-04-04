import Joi from "joi";

const name = Joi.string().min(2).max(250).required();

export const addValidator = Joi.object({
    name: name
});

export const updateValidator = Joi.object({
    id: Joi.string().required(),
    name: name
});
