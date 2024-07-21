import { map } from "./customer.mapping";
import CustomerRepository from "./customer.repository";
import CustomerDto from "./dto/customer.dto";
import AddCustomerDto from "./dto/add.customer.dto";
import UpdateCustomerDto from "./dto/update.customer.dto";

export default class CustomerService {
    constructor(private readonly customerRepository: CustomerRepository) {}

    list = async (): Promise<CustomerDto[]> => {
        return (await this.customerRepository.list()).map(map) as CustomerDto[];
    };

    get = async (id: string): Promise<CustomerDto | null> => {
        return map(await this.customerRepository.get(id));
    };

    add = async (dto: AddCustomerDto): Promise<string> => {
        return await this.customerRepository.add({ ...dto, id: "" });
    };

    update = async (dto: UpdateCustomerDto): Promise<void> => {
        await this.customerRepository.update({ ...dto });
    };

    remove = async (id: string): Promise<void> => {
        await this.customerRepository.remove(id);
    };
}
