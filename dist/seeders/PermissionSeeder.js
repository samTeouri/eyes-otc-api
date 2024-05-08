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
exports.seedPermissions = void 0;
const Permission_1 = require("../models/Permission");
const Role_1 = require("../models/Role");
const seedPermissions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find citizen role
        const citizenRole = yield Role_1.Role.findOne({ name: 'citizen' });
        // Create citizen permissions
        const citizenPermissions = yield Permission_1.Permission.insertMany([
            { name: 'create_incident' },
        ]);
        // Set permissions to citizen role
        if (citizenRole) {
            citizenPermissions.forEach((citizenPermission) => __awaiter(void 0, void 0, void 0, function* () {
                citizenRole.permissions.push(citizenPermission);
            }));
            yield citizenRole.save();
        }
        // Find manager role
        const managerRole = yield Role_1.Role.findOne({ name: 'manager' });
        // Create manager permissions
        const managerPermissions = yield Permission_1.Permission.insertMany([
            { name: 'create_notification' },
        ]);
        // Set permissions to manager role
        if (managerRole) {
            managerPermissions.forEach((citizenPermission) => __awaiter(void 0, void 0, void 0, function* () {
                managerRole.permissions.push(citizenPermission);
            }));
            yield managerRole.save();
        }
        console.log('Permissions seeded successfully');
    }
    catch (error) {
        console.log('Error while seeding permissions:', error);
    }
});
exports.seedPermissions = seedPermissions;
