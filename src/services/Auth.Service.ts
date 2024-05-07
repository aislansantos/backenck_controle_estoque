import "dotenv/config";
import * as bcrypt from "bcrypt";
import * as JWT from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const login = async (email: string, password: string) => {
    try {
        const user = await prisma.user.findFirst({ where: { email } });

        if (!user) return false;
        const validate = await bcrypt.compare(password, user.password);
        if (!validate) return false;

        return user;
    } catch (error) {
        return false;
    }
};

// Create user token
type DataUser = { email: string; password: string; admin: boolean };
export const createToken = (user: DataUser) => {
    return JWT.sign(
        { email: user.email, password: user.password, admin: user.admin },
        process.env.DEFAULT_TOKEN as string,
        { expiresIn: "1m" },
    );
};
