import { PrismaClient, Prisma } from "@prisma/client";
import * as UnitService from "@/services/ProductsUnit.Service";
import * as CatService from "@/services/ProductsCategory.Service";

const prisma = new PrismaClient();

export const getAll = async () => {
    try {
        const products = await prisma.product.findMany();
        const productsCompleteData = [];
        for (const product in products) {
            const unit = await UnitService.getUnitProducts(
                products[product].id_unit,
            );
            const cat = await CatService.getCatProducts(
                products[product].id_category,
            );
            productsCompleteData.push({ ...products[product], unit, cat });
        }
        return productsCompleteData;
    } catch (error) {
        return false;
    }
};

export const getProduct = async (id: number) => {
    try {
        const product = await prisma.product.findFirst({ where: { id } });
        const productCompleteData = [];
        if (!product) return false;

        const unit = await UnitService.getUnitProducts(product.id_unit);
        const cat = await CatService.getCatProducts(product.id_category);

        productCompleteData.push({ ...product, unit, cat });

        console.log(productCompleteData);

        return productCompleteData;
    } catch (error) {
        return false;
    }
};

type ProductCreateData = Prisma.Args<typeof prisma.product, "create">["data"];
export const addProduct = async (data: ProductCreateData) => {
    try {
        const productExist = await prisma.product.findFirst({
            where: { description: data.description },
        });
        if (productExist) return false;

        return await prisma.product.create({ data });
    } catch (error) {
        return false;
    }
};

type ProductUpdateData = Prisma.Args<typeof prisma.product, "update">["data"];
export const updateProduct = async (id: number, data: ProductUpdateData) => {
    try {
        const updatedProduct = await prisma.product.update({
            where: { id },
            data,
        });

        return updatedProduct;
    } catch (error) {
        return false;
    }
};

export const removeProduct = async (id: number) => {
    try {
        return await prisma.product.delete({ where: { id } });
    } catch (error) {
        return false;
    }
};
