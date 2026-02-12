import CustomerMapper from "./customer.mapper";
import CustomerRepository from "./customer.repository";
import CustomerDto from "./dto/customer.dto";
import AddCustomerDto from "./dto/add.customer.dto";
import UpdateCustomerDto from "./dto/update.customer.dto";

export default class CustomerService {
    constructor(private readonly customerRepository: CustomerRepository) { }

    async list(): Promise<CustomerDto[]> {
        return (await this.customerRepository.list()).map(CustomerMapper.toDto) as CustomerDto[];
    }

    async get(id: string): Promise<CustomerDto | null> {
        return CustomerMapper.toDto(await this.customerRepository.get(id));
    }

    async add(dto: AddCustomerDto): Promise<string> {
        return this.customerRepository.add({ ...dto, id: "" });
    }

    async update(dto: UpdateCustomerDto): Promise<void> {
        await this.customerRepository.update({ ...dto });
    }

    async remove(id: string): Promise<void> {
        await this.customerRepository.remove(id);
    }
}
