import Customer from "./customer.entity";
import CustomerDto from "./dto/customer.dto";

export const map = (customer: Customer | undefined | null): CustomerDto | null =>
    !customer ? null : { id: customer.id, name: customer.name };
