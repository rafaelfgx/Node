import express from "express";
import validate from "../shared/validate";
import CustomerController from "./customer.controller";
import CustomerService from "./customer.service";
import CustomerRepository from "./customer.repository";
import { addValidator, updateValidator } from "./customer.validation";

const router = express.Router();
const customerController = new CustomerController(new CustomerService(new CustomerRepository()));

router.get("/", customerController.list);
router.get("/:id", customerController.get);
router.post("/", validate(addValidator), customerController.add);
router.put("/:id", validate(updateValidator), customerController.update);
router.delete("/:id", customerController.remove);

export default router;
