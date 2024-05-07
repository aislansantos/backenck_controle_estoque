import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getAll = async () => {
    try {
        return await prisma.seller.findMany();
    } catch (error) {
        return false;
    }
};

export const getSeller = async (id: number) => {
    try {
        return await prisma.seller.findFirst({ where: { id } });
    } catch (error) {
        return false;
    }
};

type SellerCreateData = Prisma.Args<typeof prisma.seller, "create">["data"];
export const addSeller = async (data: SellerCreateData) => {
    try {
        return await prisma.seller.create({ data });
    } catch (error) {
        return false;
    }
};

type SellerUpdateData = Prisma.Args<typeof prisma.seller, "update">["data"];
export const updateSeller = async (id: number, data: SellerUpdateData) => {
    try {
        const updatedSeller = await prisma.seller.update({
            where: { id },
            data,
        });

        return updatedSeller;
    } catch (error) {
        return false;
    }
};

export const removeSeller = async (id: number) => {
    try {
        return await prisma.seller.delete({ where: { id } });
    } catch (error) {
        return false;
    }
};
