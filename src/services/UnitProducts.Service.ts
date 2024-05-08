import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getAll = async () => {
    try {
        return await prisma.productUnit.findMany();
    } catch (error) {
        return false;
    }
};

export const getUnitProducts = async (id: number) => {
    try {
        return await prisma.productUnit.findFirst({ where: { id } });
    } catch (error) {
        return false;
    }
};

type UntProdCreateData = Prisma.Args<
    typeof prisma.productUnit,
    "create"
>["data"];
export const addUnitProducts = async (data: UntProdCreateData) => {
    try {
        return await prisma.productUnit.create({ data });
    } catch (error) {
        return false;
    }
};

type UnitProdUpdateData = Prisma.Args<
    typeof prisma.productUnit,
    "update"
>["data"];
export const updateUnitProduct = async (
    id: number,
    data: UnitProdUpdateData,
) => {
    try {
        const updatedUnitProduct = await prisma.productUnit.update({
            where: { id },
            data,
        });

        return updatedUnitProduct;
    } catch (error) {
        return false;
    }
};

export const removeUnitProduct = async (id: number) => {
    try {
        return await prisma.productUnit.delete({ where: { id } });
    } catch (error) {
        return false;
    }
};
