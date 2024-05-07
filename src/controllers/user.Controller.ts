import { RequestHandler, Request, Response } from "express";
import * as UserService from "@/services/User.Service";
import { cryptPassword } from "@/utils/hashPassword";
import { z } from "zod";

export const ping: RequestHandler = (req: Request, res: Response) => {
    return res.json({ pong: true });
};

export const getAll: RequestHandler = async (req: Request, res: Response) => {
    const items = await UserService.getAll();

    if (items && Array.isArray(items)) {
        const users = items.map((user) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
            };
        });
        return res.json({ users });
    }

    return res.json({ error: "Ocorreu um erro." });
};

export const getUser: RequestHandler = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await UserService.getUser(parseInt(id));

    return res.json({ user });
};

export const addUser: RequestHandler = async (req: Request, res: Response) => {
    const adduserSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
        admin: z.boolean(),
    });

    const body = adduserSchema.safeParse(req.body);

    if (!body.success) return res.json({ error: "Dados inválidos." });

    const newPassword = await cryptPassword(body.data.password);
    body.data.password = newPassword;

    const newUser = await UserService.addUser(body.data);

    if (newUser) return res.status(201).json({ user: newUser });

    return res.json({ error: "Ocorreu um erro." });
};

export const updateUser: RequestHandler = async (
    req: Request,
    res: Response,
) => {
    const { id } = req.params;
    const updateUserSchema = z.object({
        name: z.string().optional(),
        email: z.string().email().optional(),
        password: z.string().optional(),
        admin: z.boolean().optional(),
        token: z.string().optional(),
    });

    const body = updateUserSchema.safeParse(req.body);
    if (!body.success) return res.json({ error: "Dados inválidos." });

    const updatedUser = await UserService.updateUser(parseInt(id), body.data);

    if (updatedUser) return res.json({ user: updatedUser });

    return res.json({ error: "Ocorreu um erro." });
};
