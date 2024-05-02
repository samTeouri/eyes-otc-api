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
const PermissionSeeder_1 = require("./PermissionSeeder");
const RoleSeeder_1 = require("./RoleSeeder");
const UserSeeder_1 = require("./UserSeeder");
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, RoleSeeder_1.seedRoles)(),
        yield (0, UserSeeder_1.seedUsers)(),
        yield (0, PermissionSeeder_1.seedPermissions)();
});
seed();
