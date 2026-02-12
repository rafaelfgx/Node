import Customer from "./customer.entity";
import CustomerDto from "./dto/customer.dto";

export default class CustomerMapper {
    static toDto(customer: Customer | undefined | null): CustomerDto | null {
        return !customer ? null : { id: customer.id, name: customer.name };
    }
}
