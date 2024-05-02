import { RequestHandler, Request, Response } from "express";
import * as UserService from "@/services/User.Service";
import { createToken } from "@/services/Auth.Service";
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
        email: z.string(),
        password: z.string(),
        admin: z.boolean(),
        token: z.string(),
    });
    const tokenData = {
        email: req.body.data?.email,
        password: req.body.data?.password,
    };

    const token = createToken(tokenData);
    const body = adduserSchema.safeParse({ ...req.body, token });

    if (!body.success) return res.json({ error: "Dados inválidos." });

    const newUser = await UserService.addUser(body.data);
    console.log(newUser);

    if (newUser) return res.status(201).json({ user: newUser });

    return res.json({ error: "Ocorreu um erro." });
};

// export const updateUser: RequestHandler = (req: Request, res: Response) => {};
