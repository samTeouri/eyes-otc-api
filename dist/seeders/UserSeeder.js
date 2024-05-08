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
exports.seedUsers = void 0;
const Role_1 = require("../models/Role");
const User_1 = require("../models/User");
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find citizen role
        const citizenRole = yield Role_1.Role.findOne({ name: 'citizen' });
        // Find manager role
        const managerRole = yield Role_1.Role.findOne({ name: 'manager' });
        // Create citizen users
        const citizen1 = yield User_1.User.create({
            id: "LADJ20241",
            firstName: "Serigne",
            lastName: "LADJI",
            email: "sladji@mail.com",
            phone: 90902024,
            password: "password1234"
        });
        if (citizenRole) {
            yield citizen1.roles.push(citizenRole);
        }
        const citizen2 = yield User_1.User.create({
            id: "LARD20241",
            firstName: "David",
            lastName: "LARE",
            email: "dlare@mail.com",
            phone: 90992002,
            password: "password1234"
        });
        if (citizenRole) {
            yield citizen2.roles.push(citizenRole);
        }
        // Create manager users
        const manager1 = yield User_1.User.create({
            id: "GANF20241",
            firstName: "Farid",
            lastName: "GANI",
            email: "fgani@mail.com",
            phone: 91311220,
            password: "password1234"
        });
        if (managerRole) {
            yield manager1.roles.push(managerRole);
        }
        console.log('Users seeded successfully');
    }
    catch (error) {
        console.log('Error while seeding users:', error);
    }
});
exports.seedUsers = seedUsers;
