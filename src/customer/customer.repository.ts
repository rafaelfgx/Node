import MongoService from "#src/shared/mongo.service.js";
import Customer from "./customer.entity.js";
import CustomerMapper from "./customer.mapper.js";
import CustomerDocument from "./customer.document.js";

export default class CustomerRepository {
    private get customers() {
        return MongoService.collection<CustomerDocument>("customers");
    }

    async list(): Promise<Customer[]> {
        return (await this.customers.find().toArray()).map(CustomerMapper.toEntity).filter(Boolean) as Customer[];
    }

    async get(id: string): Promise<Customer | null> {
        return CustomerMapper.toEntity(await this.customers.findOne({ _id: id }));
    }

    async create(customer: Customer): Promise<string> {
        await this.customers.insertOne({ _id: customer.id, ...customer });
        return customer.id;
    }

    async update(customer: Customer): Promise<void> {
        await this.customers.updateOne({ _id: customer.id }, { $set: { ...customer } });
    }

    async delete(id: string): Promise<void> {
        await this.customers.deleteOne({ _id: id });
    }
}
