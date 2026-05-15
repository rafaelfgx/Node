import CustomerRepository from "./customer.repository.js";
import CustomerService from "./customer.service.js";
import CustomerController from "./customer.controller.js";

export const customerRepository = new CustomerRepository();
export const customerService = new CustomerService(customerRepository);
export const customerController = new CustomerController(customerService);
