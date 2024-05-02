"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TroubleCategory = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Trouble_1 = require("./Trouble");
class TroubleCategory extends sequelize_1.Model {
}
exports.TroubleCategory = TroubleCategory;
TroubleCategory.init({
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
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'TroubleCategory',
    tableName: 'trouble_categories'
});
TroubleCategory.hasMany(Trouble_1.Trouble, {
    foreignKey: 'trouble_categorie_id'
});
