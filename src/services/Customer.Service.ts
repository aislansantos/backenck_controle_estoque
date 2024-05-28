import { PrismaClient } from "@prisma/client";
import * as SellerService from "@/services/Seller.Service";

interface ICustomersCad {
    name: string;
    email: string;
    city: string;
    active: boolean;
    id_seller: number;
}

interface ICustomersUpdate {
    name?: string;
    email?: string;
    city?: string;
    active?: boolean;
    id_seller?: number;
}

export default class CustomerService {
    private prismaClient;
    constructor() {
        this.prismaClient = new PrismaClient();
    }

    public async getAll() {
        try {
            return await this.prismaClient.customer.findMany();
        } catch (error) {
            return false;
        }
    }

    public async getCustomer(id: number) {
        try {
            const customerData = await this.prismaClient.customer.findFirst({
                where: { id },
            });
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
    }

    public async addCustomer(data: ICustomersCad) {
        try {
            return await this.prismaClient.customer.create({ data });
        } catch (error) {
            return false;
        }
    }

    public async updateCustomer(id: number, data: ICustomersUpdate) {
        try {
            const updatedCustomer = await this.prismaClient.customer.update({
                where: { id },
                data,
            });

            return updatedCustomer;
        } catch (error) {
            return false;
        }
    }

    public async removeCustomer(id: number) {
        try {
            return await this.prismaClient.customer.delete({
                where: { id },
            });
        } catch (error) {
            return false;
        }
    }
}
