import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class User extends Model {
    declare id: string;
    declare firstName: string;
    declare lastName: string;
    declare phone: BigInteger;
    declare email: string;
    declare address: string;
    declare password: string;
    declare createdAt: Date;
    declare upadtedAt: Date;

    async createId(): Promise<string> {
        let i = 1;
        let id: string;
      
        while (true) {
            id = this.lastName.slice(0, 3) + this.firstName[0] + new Date().getFullYear() + i.toString();
            try {
                const user = await User.findByPk(id);
                if (user) {
                    i++;
                    continue;
                }
                return id;
            } catch (error) {
                console.error("Error finding user:", error);
            }
        }
    }
}

User.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.BIGINT,
            allowNull: true,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize: sequelize,
        modelName: 'User',
        tableName: 'users',
    },
);
