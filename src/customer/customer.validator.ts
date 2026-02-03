import { z } from "zod";

export default class CustomerValidator {
    private static readonly name = z.string().min(3).max(250);

    static readonly add = z.object({ name: this.name });

    static readonly update = z.object({ id: z.string(), name: this.name });
}
