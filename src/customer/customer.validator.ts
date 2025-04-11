import Joi from "joi";

export default class CustomerValidator {
    private static readonly name = Joi.string().min(3).max(250).required();

    static readonly add = Joi.object({ name: this.name });

    static readonly update = Joi.object({ id: Joi.string().required(), name: this.name });
}
