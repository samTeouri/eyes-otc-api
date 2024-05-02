"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {
    createId() {
        return __awaiter(this, void 0, void 0, function* () {
            let i = 1;
            let id;
            while (true) {
                id = this.lastName.slice(0, 3) + this.firstName[0] + new Date().getFullYear() + i.toString();
                try {
                    const user = yield User.findByPk(id);
                    if (user) {
                        i++;
                        continue;
                    }
                    return id;
                }
                catch (error) {
                    throw error;
                }
            }
        });
    }
}
exports.User = User;
User.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    password: {
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
    modelName: 'User',
    tableName: 'users',
});
