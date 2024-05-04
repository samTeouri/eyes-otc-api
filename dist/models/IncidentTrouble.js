"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentTrouble = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class IncidentTrouble extends sequelize_1.Model {
}
exports.IncidentTrouble = IncidentTrouble;
IncidentTrouble.init({
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
    modelName: 'IncidentTrouble',
    tableName: 'incident_troubles'
});
