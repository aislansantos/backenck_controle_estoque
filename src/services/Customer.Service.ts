import { PrismaClient, Prisma } from "@prisma/client";
import * as SellerService from "@/services/Seller.Service";

const prisma = new PrismaClient();

export const getAll = async () => {
    try {
        return await prisma.customer.findMany();
    } catch (error) {
        return false;
    }
};

export const getCustomer = async (id: number) => {
    try {
        const customerData = await prisma.customer.findFirst({ where: { id } });
        if (!customerData) return false;
        const sellerData = await SellerService.getSeller(
            customerData.id_seller,
        );
        if (!sellerData) return false;
        const nameSeller = sellerData.name;

        const customer = { ...customerData, nameSeller };
        return customer;
    } catch (error) {
        return false;
    }
};

type CustomerCreateData = Prisma.Args<typeof prisma.customer, "create">["data"];
export const addCustomer = async (data: CustomerCreateData) => {
    try {
        return await prisma.customer.create({ data });
    } catch (error) {
        return false;
    }
};

type CustomerUpdateData = Prisma.Args<typeof prisma.customer, "update">["data"];
export const updateCustomer = async (id: number, data: CustomerUpdateData) => {
    try {
        const updatedCustomer = await prisma.customer.update({
            where: { id },
            data,
        });

        return updatedCustomer;
    } catch (error) {
        return false;
    }
};

export const removeCustomer = async (id: number) => {
    try {
        return await prisma.customer.delete({ where: { id } });
    } catch (error) {
        return false;
    }
};
