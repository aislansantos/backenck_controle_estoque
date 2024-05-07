import { Request, Response, NextFunction } from "express";
import * as JWT from "jsonwebtoken";
import "dotenv/config";

export const Auth = {
    private: async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.headers.authorization)
                return res.json({ notAllowed: true });

            const [authType, token] = req.headers.authorization.split(" ");

            if (authType !== "Bearer") return res.json({ notAllowed: true });

            JWT.verify(token, process.env.DEFAULT_TOKEN as string);

            next();
        } catch (error) {
            return res.json({ error });
        }
    },
};
