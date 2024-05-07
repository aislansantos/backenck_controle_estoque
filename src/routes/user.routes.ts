import { Router } from "express";
import * as CustomerController from "@/controllers/Customers.Controller";

const router = Router();

// Rotas de Clientes
router.get("/customers", CustomerController.getAll);
router.get("/customers/:id", CustomerController.getCustomer);
router.post("/customers", CustomerController.addCustomer);
router.put("/customers/:id", CustomerController.updateCustomer);

export default router;
