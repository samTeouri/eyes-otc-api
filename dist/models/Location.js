"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Location = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Incident_1 = require("./Incident");
const SupportCenter_1 = require("./SupportCenter");
class Location extends sequelize_1.Model {
}
exports.Location = Location;
Location.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    latitude: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    longitude: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('incident', 'supportCenter'),
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
    modelName: 'Location',
    tableName: 'locations'
});
Location.hasOne(Incident_1.Incident, {
    foreignKey: 'location_id'
});
Location.hasOne(SupportCenter_1.SupportCenter, {
    foreignKey: 'location_id'
});
