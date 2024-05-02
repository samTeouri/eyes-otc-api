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
    const citizenRole = yield Role_1.Role.findOne({ where: { name: 'citizen' } });
    const citizenPermissions = yield Permission_1.Permission.bulkCreate([
        { name: 'create_incident' },
    ]);
    citizenRole === null || citizenRole === void 0 ? void 0 : citizenRole.setPermissions(citizenPermissions);
    const managerRole = yield Role_1.Role.findOne({ where: { name: 'manager' } });
    const managerPermissions = yield Permission_1.Permission.bulkCreate([
        { name: 'create_notification' },
    ]);
    managerRole === null || managerRole === void 0 ? void 0 : managerRole.setPermissions(managerPermissions);
});
exports.seedPermissions = seedPermissions;
