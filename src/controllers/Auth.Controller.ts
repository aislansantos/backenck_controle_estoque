import { Request, Response, RequestHandler } from "express";
import * as AuthService from "@/services/Auth.Service";
import { createToken } from "@/services/Auth.Service";
import { z } from "zod";

export const login: RequestHandler = async (req: Request, res: Response) => {
    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    const body = loginSchema.safeParse(req.body);

    if (!body.success) return res.json({ error: "Dados inválidos" });

    const user = await AuthService.login(body.data.email, body.data.password);

    if (!user) return res.json({ error: "Email/senha inválidos." });

    const token = createToken(user);

    return res.json({ token });
};
