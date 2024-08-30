import customers from "./customer.schema";
import Customer from "./customer.entity";

export default class CustomerRepository {
    list = async (): Promise<Customer[]> => {
        return await customers.find();
    };

    get = async (id: string): Promise<Customer | null> => {
        return await customers.findById(id);
    };

    add = async (customer: Customer): Promise<string> => {
        return (await customers.create(customer)).id;
    };

    update = async (customer: Customer): Promise<void> => {
        await customers.findByIdAndUpdate(customer.id, customer);
    };

    remove = async (id: string): Promise<void> => {
        await customers.findByIdAndDelete(id);
    };
}
