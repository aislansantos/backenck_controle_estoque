import { RequestHandler, Request, Response } from "express";
import * as ProductService from "@/services/Products.Service";
import { z } from "zod";

interface Unit {
    id: number;
    description: string;
    convertionFactor: number | null;
    un: string;
}

interface Category {
    id: number;
    description: string;
    cat: string;
}

interface Product {
    id: number;
    description: string;
    amount: number;
    id_unit: number;
    id_category: number;
    active: boolean;
    unit: Unit;
    cat: Category;
}

export const getAll: RequestHandler = async (req: Request, res: Response) => {
    try {
        const productsItems = (await ProductService.getAll()) as Product[];
        const products = productsItems.map((product) => ({
            id: product.id,
            description: product.description,
            amount: product.amount,
            active: product.active,
            unit_description: product.unit.description,
            cat_description: product.cat.description,
        }));

        if (products) return res.json({ products: products });

        return res.json({ error: "Ocorreu um erro." });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const getProduct: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    try {
        const { id } = req.params;
        const productItem = (await ProductService.getProduct(
            parseInt(id),
        )) as Product[];
        if (!productItem) return res.json({ error: "Ocorreu um erro." });

        const product = productItem.map((item) => ({
            id: item.id,
            description: item.description,
            amount: item.amount,
            active: item.active,
            id_unit: item.id_unit,
            unit_description: item.unit.description,
            unit_un: item.unit.un,
            unit_convertionFactor: item.unit.convertionFactor,
            cat_id: item.cat.id,
            cat_description: item.cat.description,
            cat_cat: item.cat.cat,
        }));

        if (product) return res.json({ product });

        return res.json({ error: "Ocorreu um erro." });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const addProducts: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    try {
        const addProductsSchema = z.object({
            description: z.string(),
            amount: z.number().optional(),
            active: z.boolean().optional(),
            id_category: z.number(),
            id_unit: z.number(),
        });

        const body = addProductsSchema.safeParse(req.body);
        if (!body.success) return res.json({ error: "Dados inválidos." });

        const newProduct = await ProductService.addProduct(body.data);

        if (newProduct) return res.status(201).json({ product: newProduct });

        return res.json({ error: "Ocorreu um erro." });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const updateProduct: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    try {
        const { id } = req.params;
        const updateProductSchema = z.object({
            description: z.string().optional(),
            amount: z.number().optional(),
            active: z.boolean().optional(),
            id_category: z.number().optional(),
            id_unit: z.number().optional(),
        });
        const body = updateProductSchema.safeParse(req.body);
        if (!body.success) return res.json({ error: "Dados inválidos" });

        const updatedProduct = await ProductService.updateProduct(
            parseInt(id),
            body.data,
        );
        if (updatedProduct) return res.json({ product: updatedProduct });

        return res.json({ error: "Ocorreu um erro." });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const removeProduct: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    try {
        const { id } = req.params;
        const removedProduct = await ProductService.removeProduct(parseInt(id));
        if (removedProduct) return res.json({ deleted: removedProduct });

        return res.json({ error: "Ocorreu um erro." });
    } catch (error) {
        return res.status(500).json({ error });
    }
};
