import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getAll = async () => {
    try {
        return await prisma.productCategory.findMany();
    } catch (error) {
        return false;
    }
};

type CatProductCreateData = Prisma.Args<
    typeof prisma.productCategory,
    "create"
>["data"];
export const addCatProduct = async (data: CatProductCreateData) => {
    try {
        return await prisma.productCategory.create({ data });
    } catch (error) {
        return false;
    }
};

export const getCatProducts = async (id: number) => {
    try {
        return await prisma.productCategory.findFirst({ where: { id } });
    } catch (error) {
        return false;
    }
};

type CatProductsUpdateData = Prisma.Args<
    typeof prisma.productCategory,
    "update"
>["data"];
export const updateCatProducts = async (
    id: number,
    data: CatProductsUpdateData,
) => {
    try {
        const updatedCarProducts = await prisma.productCategory.update({
            where: { id },
            data,
        });

        return updatedCarProducts;
    } catch (error) {
        return false;
    }
};

export const removeCatProducts = async (id: number) => {
    try {
        return await prisma.productCategory.delete({ where: { id } });
    } catch (error) {
        return false;
    }
};
