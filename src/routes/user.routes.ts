import { Router } from "express";
import * as CustomerController from "@/controllers/Customers.Controller";
import * as SellerController from "@/controllers/Seller.Controller";
import * as UnitProductsController from "@/controllers/UnitProducts.Controller";

const router = Router();

// Rotas de Clientes
router.get("/customers", CustomerController.getAll);
router.get("/customers/:id", CustomerController.getCustomer);
router.post("/customers", CustomerController.addCustomer);
router.put("/customers/:id", CustomerController.updateCustomer);
router.delete("/customers/:id", CustomerController.removeCustomer);

// Rotas de vendedores
router.get("/sellers", SellerController.getAll);
router.get("/sellers/:id", SellerController.getSeller);
router.post("/sellers", SellerController.addSeller);
router.put("/sellers/:id", SellerController.updateSeller);
router.delete("/sellers/:id", SellerController.removeSeller);

// Rotas Produtos
// Rotas Unidade dos Produtos
router.get("/products/units", UnitProductsController.getAll);
router.get("/products/units/:id", UnitProductsController.getUnitProducts);
router.post("/products/units", UnitProductsController.addUnitProducts);
router.put("/products/units/:id", UnitProductsController.updateUnitPoduct);
// router.delete("/products/units/:id", productsController.removeProducts);

export default router;
