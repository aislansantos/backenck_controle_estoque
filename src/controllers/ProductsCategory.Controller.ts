import { RequestHandler, Request, Response } from "express";
import * as CatProductService from "@/services/ProductsCategory.Service";
import { z } from "zod";

export const getAll: RequestHandler = async (req: Request, res: Response) => {
    const catProductsItems = await CatProductService.getAll();
    if (catProductsItems) return res.json({ categories: catProductsItems });

    return res.json({ error: "Ocorreu um erro." });
};

export const addCatProducts: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    const addCatProductsSchema = z.object({
        description: z.string(),
        cat: z.string(),
    });
    const body = addCatProductsSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: "Dados inválidos" });

    const newCatProducts = await CatProductService.addCatProduct(body.data);
    if (newCatProducts)
        return res.status(201).json({ catProducts: newCatProducts });

    return res.json({ error: "Ocorreu um erro." });
};

export const getCatProducts: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    const { id } = req.params;

    const catProducts = await CatProductService.getCatProducts(parseInt(id));
    if (catProducts) return res.json({ catProducts });

    return res.json({ error: "Ocorreu um erro." });
};

export const updateCatProducts: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    const { id } = req.params;

    const updatedCatProductsSchema = z.object({
        description: z.string().optional(),
        cat: z.string().optional(),
    });

    const body = updatedCatProductsSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: "Dados inválidos." });
    console.log(body.data);

    const updatedCatProducts = await CatProductService.updateCatProducts(
        parseInt(id),
        body.data,
    );

    if (updatedCatProducts) return res.json({ catProduct: updatedCatProducts });

    return res.json({ error: "Ocorreu um erro." });
};

export const removeCatProducts: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    const { id } = req.params;
    const removedCatProducts = await CatProductService.removeCatProducts(
        parseInt(id),
    );
    if (removedCatProducts)
        return res.json({ DeletedCategory: removedCatProducts });
};
