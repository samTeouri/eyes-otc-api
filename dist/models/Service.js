"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Trouble_1 = require("./Trouble");
const Support_1 = require("./Support");
class Service extends sequelize_1.Model {
}
exports.Service = Service;
Service.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
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
    modelName: 'Service',
    tableName: 'services'
});
Service.belongsToMany(Trouble_1.Trouble, {
    through: Support_1.Support,
    foreignKey: 'service_id'
});
Trouble_1.Trouble.belongsToMany(Service, {
    through: Support_1.Support,
    foreignKey: 'trouble_id'
});
