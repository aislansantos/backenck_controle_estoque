import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import * as JWT from "jsonwebtoken";

const prisma = new PrismaClient();

type LoginUser = { email: string; password: string };
export const login = async (filters: LoginUser) => {
    try {
        const user = await prisma.user.findFirst({ where: filters });
        if (!user) return false;

        return user;
    } catch (error) {
        return false;
    }
};

type DataUser = { email: string; password: string };
export const createToken = (user: DataUser) => {
    return JWT.sign(
        { email: user.email, password: user.password },
        process.env.DEFAULT_TOKEN as string,
    );
};
