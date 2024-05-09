import { RequestHandler, Request, Response } from "express";
import { z } from "zod";
import * as SupplerService from "@/services/Supplier.Service";

export const getAll: RequestHandler = async (req: Request, res: Response) => {
    try {
        const supplierItems = await SupplerService.getAll();
        if (supplierItems) return res.json({ suppliers: supplierItems });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const getSupplier: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    try {
        const { id } = req.params;
        const supplierItem = await SupplerService.getSupplier(parseInt(id));
        if (supplierItem) return res.json({ supplier: supplierItem });

        return res.json({ error: "Ocorreu um erro." });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const addSupplier: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    try {
        const addSupplierSchema = z.object({
            name: z.string(),
            email: z.string().email(),
        });

        const body = addSupplierSchema.safeParse(req.body);
        if (!body.success) return res.json({ error: "Dados inválidos." });

        const newSupplier = await SupplerService.addSupplier(body.data);
        if (newSupplier) return res.status(201).json({ supplier: newSupplier });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const updateSupplier: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    try {
        const { id } = req.params;
        const updateSupplierSchema = z.object({
            name: z.string().optional(),
            email: z.string().email().optional(),
        });

        const body = updateSupplierSchema.safeParse(req.body);
        if (!body.success) return res.json({ error: "Dados inválidos." });

        const updatedSupplier = await SupplerService.updateSupplier(
            parseInt(id),
            body.data,
        );
        if (updatedSupplier) return res.json({ supplier: updatedSupplier });

        return res.json({ error: "Ocorreu um erro." });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const removeSupplier: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    try {
        const { id } = req.params;

        const removedSupplier = await SupplerService.removeSupplier(
            parseInt(id),
        );
        if (removedSupplier) return res.json({ removedSupplier });

        return res.json({ error: "Ocorreu um erro." });
    } catch (error) {
        return false;
    }
};
