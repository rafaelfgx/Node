import express, { Router } from "express";
import validatorMiddleware from "../shared/validator.middleware";
import CustomerValidator from "./customer.validator";
import CustomerRepository from "./customer.repository";
import CustomerService from "./customer.service";
import CustomerController from "./customer.controller";

const customerRepository = new CustomerRepository();
const customerService = new CustomerService(customerRepository);
const customerController = new CustomerController(customerService);

const router: Router = express.Router();
router.get("/", customerController.list.bind(customerController));
router.get("/:id", customerController.get.bind(customerController));
router.post("/", validatorMiddleware(CustomerValidator.add), customerController.add.bind(customerController));
router.put("/:id", validatorMiddleware(CustomerValidator.update), customerController.update.bind(customerController));
router.delete("/:id", customerController.remove.bind(customerController));

export default router;
