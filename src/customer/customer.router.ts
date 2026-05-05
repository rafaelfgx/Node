import { Router } from "express";
import validatorMiddleware from "#src/shared/validator.middleware.js";
import { customerController } from "./customer.container.js";
import CustomerValidator from "./customer.validator.js";

const router = Router();
router.get("/", customerController.list);
router.get("/:id", customerController.get);
router.post("/", validatorMiddleware(CustomerValidator.create), customerController.create);
router.put("/:id", validatorMiddleware(CustomerValidator.update), customerController.update);
router.delete("/:id", customerController.delete);
export default router;
