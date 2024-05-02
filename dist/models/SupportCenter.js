"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportCenter = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Service_1 = require("./Service");
const User_1 = require("./User");
class SupportCenter extends User_1.User {
}
exports.SupportCenter = SupportCenter;
SupportCenter.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('hôpital', 'pompier', 'gendarmerie'),
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    telephone: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'SupportCenter',
    tableName: 'support_centers',
});
SupportCenter.belongsTo(Service_1.Service, {
    foreignKey: 'service_id'
});
