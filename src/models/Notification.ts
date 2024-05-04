import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Notification extends Model {
    declare id: BigInteger;
    declare isHandled: boolean;
    declare createdAt: Date;
    declare updatedAt: Date;
}

Notification.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        isReaded: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
        modelName: 'Notification',
        tableName: 'notifications'
    }
);