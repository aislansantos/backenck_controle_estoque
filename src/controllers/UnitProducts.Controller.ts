import { RequestHandler, Request, Response } from "express";
import * as UnitProductService from "@/services/UnitProducts.Service";
import { z } from "zod";

export const getAll: RequestHandler = async (req: Request, res: Response) => {
    const unitProductsItems = await UnitProductService.getAll();
    if (unitProductsItems) return res.json({ units: unitProductsItems });

    return res.json({ error: "Ocorreu um erro." });
};

export const getUnitProducts: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    const { id } = req.params;
    const unitProduct = await UnitProductService.getUnitProducts(parseInt(id));
    if (unitProduct) return res.json({ unitProduct });

    return res.json({ error: "Ocorreu um erro." });
};

export const addUnitProducts: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    const addUnitProductsSchema = z.object({
        description: z.string(),
        un: z.string(),
        convertionFactor: z.number(),
    });

    const body = addUnitProductsSchema.safeParse(req.body);

    if (!body.success) return res.json({ error: "Dados inválidos" });

    const newUnitProduct = await UnitProductService.addUnitProducts(body.data);
    if (newUnitProduct)
        return res.status(201).json({ unProduct: newUnitProduct });

    return res.json({ error: "Ocorreu um erro." });
};

export const updateUnitPoduct: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    const { id } = req.params;
    const updateUnitProductSchema = z.object({
        description: z.string().optional(),
        un: z.string().optional(),
        convertionFactor: z.number().optional(),
    });

    const body = updateUnitProductSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: "Dados inválidos" });

    const updatedUnitProduct = await UnitProductService.updateUnitProduct(
        parseInt(id),
        body.data,
    );
    if (updatedUnitProduct) return res.json({ unProduct: updatedUnitProduct });

    return res.json({ error: "Ocorreu um erro." });
};

export const removeUnitProduct: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    const { id } = req.params;
    const removedUnitProduct = await UnitProductService.removeUnitProdct(
        parseInt(id),
    );
    if (removedUnitProduct) return res.json({ removedUnitProduct });

    return res.json({ error: "Ocorreu um erro." });
};
