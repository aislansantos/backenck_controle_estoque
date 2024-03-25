import { Model, DataTypes } from "sequelize";

import sequelize from "../instances/pg";

export interface ICustomer extends Model {
    id: number;
    name: string;
    email: string;
    city: string;
}

export const Customer = sequelize.define<ICustomer>(
    "Customer",
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
            set(value: string) {
                if (value === undefined || value === null) {
                    return false;
                }
                return this.setDataValue("name", value.toUpperCase());
            },
        },
        email: {
            type: DataTypes.STRING,
            set(value: string) {
                if (value === undefined || value === null) {
                    return false;
                }
                return this.setDataValue("email", value.toLowerCase());
            },
        },
        city: {
            type: DataTypes.STRING,
            set(value: string) {
                if (value === undefined || value === null) {
                    return false;
                }
                return this.setDataValue(
                    "city",
                    value.charAt(0).toUpperCase() + value.slice(1)
                );
            },
        },
    },
    {
        tableName: "customer",
        timestamps: false,
    }
);
