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
exports.seedRoles = void 0;
const Role_1 = require("../models/Role");
const seedRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Role_1.Role.insertMany([
            { name: 'citizen' },
            { name: 'supportCenter' },
            { name: 'manager' },
        ]);
        console.log('Roles seeded successfully');
    }
    catch (error) {
        console.log('Error while seeding roles:', error);
    }
});
exports.seedRoles = seedRoles;
