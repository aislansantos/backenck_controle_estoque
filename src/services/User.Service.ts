import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getAll = async () => {
    try {
        return await prisma.user.findMany();
    } catch (error) {
        return false;
    }
};

export const getUser = async (id: number) => {
    try {
        return await prisma.user.findFirst({ where: { id } });
    } catch (error) {
        return false;
    }
};

type UserCreateData = Prisma.Args<typeof prisma.user, "create">["data"];
export const addUser = async (data: UserCreateData) => {
    try {
        return await prisma.user.create({ data });
    } catch (error) {
        return false;
    }
};

type UserUpdateData = Prisma.Args<typeof prisma.user, "update">["data"];
export const updateUser = async (id: number, data: UserUpdateData) => {
    try {
        const teste = await prisma.user.update({
            where: { id },
            data,
        });

        return teste;
    } catch (error) {
        return false;
    }
};

export const getUserByEmail = async (email: string) => {
    try {
        return await prisma.user.findFirst({ where: { email } });
    } catch (error) {
        return false;
    }
};
