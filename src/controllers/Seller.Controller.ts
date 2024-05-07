import { RequestHandler, Request, Response } from "express";
import * as SellerService from "@/services/Seller.Service";
import { z } from "zod";

export const getAll: RequestHandler = async (req: Request, res: Response) => {
    const sellersItems = await SellerService.getAll();

    if (sellersItems) return res.json({ sellers: sellersItems });

    return res.json({ error: "Ocorreu um erro." });
};

export const getSeller: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    const { id } = req.params;
    const seller = await SellerService.getSeller(parseInt(id));

    if (seller) return res.json({ seller });

    return res.json({ error: "Ocorreu um erro." });
};

export const addSeller: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    const addSellerSchema = z.object({
        name: z.string(),
        email: z.string(),
        branch: z.string(),
    });

    const body = addSellerSchema.safeParse(req.body);

    if (!body.success) return res.json({ error: "Dados inválidos" });

    const newSeller = await SellerService.addSeller(body.data);
    if (newSeller) return res.status(201).json({ newSeller });

    return res.json({ error: "Ocorreu um erro" });
};

export const updateSeller: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    const { id } = req.params;
    const updateSellerSchema = z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        branch: z.string().optional(),
    });

    const body = updateSellerSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: "Dados inválidos." });

    const updatedSeller = await SellerService.updateSeller(
        parseInt(id),
        body.data,
    );

    if (updatedSeller) return res.json({ seller: updatedSeller });

    return res.json({ error: "Ocorreu um erro" });
};

export const removeSeller: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    const { id } = req.params;
    const removedSeller = await SellerService.removeSeller(parseInt(id));
    if (removedSeller) return res.json({ removedSeller });

    return res.json({ error: "Ocorreu um erro." });
};
