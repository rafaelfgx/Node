import Customers from "./customer.schema";
import Customer from "./customer.entity";

export default class CustomerRepository {
    async list(): Promise<Customer[]> {
        return Customers.find();
    }

    async get(id: string): Promise<Customer | null> {
        return Customers.findById(id);
    }

    async add(customer: Customer): Promise<string> {
        return (await Customers.create(customer)).id;
    }

    async update(customer: Customer): Promise<void> {
        await Customers.findByIdAndUpdate(customer.id, customer);
    }

    async remove(id: string): Promise<void> {
        await Customers.findByIdAndDelete(id);
    }
}
