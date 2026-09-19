import { z } from "zod";

export default class CustomerValidator {
    private static id = z.uuid();

    private static name = z.string().trim().min(3).max(250);

    public static readonly full = z.object({ id: this.id, name: this.name });

    public static readonly create = z.object({ name: this.name });

    public static readonly update = z.object({ id: this.id, name: this.name });
}
