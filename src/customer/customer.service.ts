import { randomUUID } from "crypto";
import CustomerMapper from "./customer.mapper.js";
import CustomerRepository from "./customer.repository.js";
import CustomerDto from "./dto/customer.dto.js";
import CreateCustomerDto from "./dto/create.customer.dto.js";
import UpdateCustomerDto from "./dto/update.customer.dto.js";

export default class CustomerService {
    constructor(private readonly customerRepository: CustomerRepository) {}

    async list(): Promise<CustomerDto[]> {
        return (await this.customerRepository.list()).map(CustomerMapper.toDto) as CustomerDto[];
    }

    async get(id: string): Promise<CustomerDto | null> {
        return CustomerMapper.toDto(await this.customerRepository.get(id));
    }

    async create(dto: CreateCustomerDto): Promise<string> {
        return this.customerRepository.create({ id: randomUUID(), ...dto });
    }

    async update(dto: UpdateCustomerDto): Promise<void> {
        await this.customerRepository.update({ ...dto });
    }

    async delete(id: string): Promise<void> {
        await this.customerRepository.delete(id);
    }
}
