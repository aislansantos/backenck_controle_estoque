import { RequestHandler, Request, Response } from "express";
import * as CustomerService from "@/services/Customer.Service";
import { z } from "zod";

export const getAll: RequestHandler = async (req: Request, res: Response) => {
    const customersItems = await CustomerService.getAll();

    if (customersItems && Array.isArray(customersItems)) {
        const customers = customersItems.map((customer) => {
            return {
                id: customer.id,
                name: customer.name,
                email: customer.email,
            };
        });
        return res.json({ customers });
    }
    return res.json({ error: "Ocorreu um erro." });
};

export const getCustomer: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    const { id } = req.params;
    const customer = await CustomerService.getCustomer(parseInt(id));
    if (customer) return res.json({ customer });

    return res.json({ error: "Ocorreu um erro." });
};

export const addCustomer: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    const addCustomerSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        city: z.string(),
        active: z.boolean(),
        id_seller: z.number(),
    });

    const body = addCustomerSchema.safeParse(req.body);

    if (!body.success) return res.json({ error: "Dados inválidos" });

    const newCustomer = await CustomerService.addCustomer(body.data);

    if (newCustomer) return res.status(201).json({ customer: newCustomer });

    return res.json({ error: "Ocorreu um erro." });
};

export const updateCustomer: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    const { id } = req.params;

    const updateCustomerSchema = z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        city: z.string().optional(),
        active: z.boolean().optional(),
        id_seller: z.number().optional(),
    });

    const body = updateCustomerSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: "Dados inválidos." });

    const updatedCustomer = await CustomerService.updateCustomer(
        parseInt(id),
        body.data,
    );

    if (updatedCustomer) return res.json({ customer: updateCustomer });

    return res.json({ error: "Ocorreu um erro." });
};
