import { Request, Response } from "express";
import CustomerService from "@/services/Customer.Service";
import { z } from "zod";

class CustomerController {
    public async getAll(req: Request, res: Response) {
        try {
            const customerService = new CustomerService();
            const customersItems = await customerService.getAll();

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
        } catch (error) {
            console.error("Erro ao obter clientes:", error);
            return res.status(500).json({
                error: "Ocorreu um erro ao obter clientes.",
            });
        }
    }

    public async getCustomer(req: Request, res: Response) {
        const { id } = req.params;
        const customerService = new CustomerService();

        const customer = await customerService.getCustomer(parseInt(id));
        if (customer) return res.json({ customer });

        return res.json({ error: "Ocorreu um erro." });
    }

    public async addCustomer(req: Request, res: Response) {
        try {
            const customerService = new CustomerService();
            const addCustomerSchema = z.object({
                name: z.string(),
                email: z.string().email(),
                city: z.string(),
                active: z.boolean(),
                id_seller: z.number(),
            });
            const body = addCustomerSchema.safeParse(req.body);

            if (!body.success) return res.json({ error: "Dados inválidos" });

            const newCustomer = await customerService.addCustomer(body.data);

            if (newCustomer)
                return res.status(201).json({ customer: newCustomer });

            return res.json({ error: "Ocorreu um erro." });
        } catch (error) {
            console.error("Ocorreu um erro ao criar um cliente:", error);
            return res.status(500).json({
                error: "Ocorreu um erro ao criar um cliente.",
            });
        }
    }

    public async updateCustomer(req: Request, res: Response) {
        try {
            const customerService = new CustomerService();
            const { id } = req.params;
            const updateCustomerSchema = z.object({
                name: z.string().optional(),
                email: z.string().email().optional(),
                city: z.string().optional(),
                active: z.boolean().optional(),
                id_seller: z.number().optional(),
            });

            const body = updateCustomerSchema.safeParse(req.body);

            if (!body.success) return res.json({ error: "Dados inválidos" });

            const updatedCustomer = await customerService.updateCustomer(
                parseInt(id),
                body.data,
            );

            if (updatedCustomer) return res.json({ customer: updatedCustomer });

            return res.json({ error: "Ocorreu um erro." });
        } catch (error) {
            console.error("Ocorreu um erro ao editar um cliente:", error);
            return res.status(500).json({
                error: "Ocorreu um erro ao editar um cliente.",
            });
        }
    }

    public async removeCustomer(req: Request, res: Response) {
        try {
            const customerService = new CustomerService();
            const { id } = req.params;
            const removedCustomer = await customerService.removeCustomer(
                parseInt(id),
            );
            if (removedCustomer) return res.json({ removedCustomer });

            return res.json({ error: "Ocorreu um erro." });
        } catch (error) {
            console.error("Ocorreu um erro ao editar um cliente:", error);
            return res.status(500).json({
                error: "Ocorreu um erro ao editar um cliente.",
            });
        }
    }
}

export default new CustomerController();
