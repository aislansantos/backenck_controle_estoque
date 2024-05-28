import { Router } from "express";
import CustomerController from "@/controllers/Customers.Controller";
import * as SellerController from "@/controllers/Seller.Controller";
import * as SupplierController from "@/controllers/Supplier.Controller";
import * as UnitProductsController from "@/controllers/ProductsUnit.Controller";
import * as CatProductsController from "@/controllers/ProductsCategory.Controller";
import * as ProductController from "@/controllers/Products.Controller";

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
router.delete("/products/units/:id", UnitProductsController.removeUnitProduct);

// Rotas Categorias de Produtos
router.get("/products/categories", CatProductsController.getAll);
router.get("/products/categories/:id", CatProductsController.getCatProducts);
router.post("/products/categories", CatProductsController.addCatProducts);
router.put("/products/categories/:id", CatProductsController.updateCatProducts);
router.delete(
    "/products/categories/:id",
    CatProductsController.removeCatProducts,
);

// Rotas de Produtos
router.get("/products", ProductController.getAll);
router.get("/products/:id", ProductController.getProduct);
router.post("/products", ProductController.addProducts);
router.put("/products/:id", ProductController.updateProduct);
router.delete("/products/:id", ProductController.removeProduct);

// Rotas de Fornecedores
router.get("/suppliers", SupplierController.getAll);
router.get("/suppliers/:id", SupplierController.getSupplier);
router.post("/suppliers", SupplierController.addSupplier);
router.put("/suppliers/:id", SupplierController.updateSupplier);
router.delete("/suppliers/:id", SupplierController.removeSupplier);

export default router;
