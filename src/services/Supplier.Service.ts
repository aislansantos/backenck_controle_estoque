import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export const getAll = async () => {
    try {
        return await prisma.supplier.findMany();
    } catch (error) {
        return false;
    }
};

export const getSupplier = async (id: number) => {
    try {
        return await prisma.supplier.findFirst({ where: { id } });
    } catch (error) {
        return false;
    }
};

type SupplierCreateData = Prisma.Args<typeof prisma.supplier, "create">["data"];
export const addSupplier = async (data: SupplierCreateData) => {
    try {
        return await prisma.supplier.create({ data });
    } catch (error) {
        return false;
    }
};

type SupplierUpdateData = Prisma.Args<typeof prisma.supplier, "update">["data"];
export const updateSupplier = async (id: number, data: SupplierUpdateData) => {
    try {
        const updatedSupplier = await prisma.supplier.update({
            where: { id },
            data,
        });

        return updatedSupplier;
    } catch (error) {
        return false;
    }
};

export const removeSupplier = async (id: number) => {
    try {
        return await prisma.supplier.delete({ where: { id } });
    } catch (error) {
        return false;
    }
};
