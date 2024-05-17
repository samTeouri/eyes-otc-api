"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const bcrypt = __importStar(require("bcrypt"));
const seedUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find citizen role
        const citizenRole = yield Role_1.Role.findOne({ name: 'citizen' });
        // Find manager role
        const managerRole = yield Role_1.Role.findOne({ name: 'manager' });
        // Find support center role
        const supportCenterRole = yield Role_1.Role.findOne({ name: 'supportCenter' });
        // Create citizen users
        const citizen1 = yield User_1.User.create({
            firstName: 'Serigne',
            lastName: 'LADJI',
            email: 'sladji@mail.com',
            phone: 90902024,
            password: yield bcrypt.hash('password1234', 15),
        });
        if (citizenRole) {
            yield citizen1.roles.push(citizenRole);
            yield citizen1.save();
        }
        const citizen2 = yield User_1.User.create({
            firstName: 'David',
            lastName: 'LARE',
            email: 'dlare@mail.com',
            phone: 90992002,
            password: yield bcrypt.hash('password1234', 15),
        });
        if (citizenRole) {
            yield citizen2.roles.push(citizenRole);
            yield citizen2.save();
        }
        // Create manager users
        const manager1 = yield User_1.User.create({
            firstName: 'Farid',
            lastName: 'GANI',
            email: 'fgani@mail.com',
            phone: 91311220,
            password: yield bcrypt.hash('password1234', 15),
        });
        if (managerRole) {
            yield manager1.roles.push(managerRole);
            yield manager1.save();
        }
        // Create support centers users
        // Centres de santé
        const supportCenter1 = yield User_1.User.create({
            firstName: 'Julien',
            lastName: 'LAWSON',
            email: 'chucampus@mail.com',
            phone: 97341321,
            password: yield bcrypt.hash('password1234', 15),
        });
        if (supportCenterRole) {
            yield supportCenter1.roles.push(supportCenterRole);
            yield supportCenter1.save();
        }
        const supportCenter2 = yield User_1.User.create({
            firstName: 'Djamal',
            lastName: 'ABOU',
            email: 'chusylvanusolympio@mail.com',
            phone: 93677654,
            password: yield bcrypt.hash('password1234', 15),
        });
        if (supportCenterRole) {
            yield supportCenter2.roles.push(supportCenterRole);
            yield supportCenter2.save();
        }
        const supportCenter3 = yield User_1.User.create({
            firstName: 'Roger',
            lastName: 'LEMOU',
            email: 'dogtalafie@mail.com',
            phone: 99233212,
            password: yield bcrypt.hash('password1234', 15),
        });
        if (supportCenterRole) {
            yield supportCenter3.roles.push(supportCenterRole);
            yield supportCenter3.save();
        }
        // Gendarmeries
        const supportCenter4 = yield User_1.User.create({
            firstName: 'Hodabalo',
            lastName: 'SIMFEYI',
            email: 'gendarmeriesanguera@mail.com',
            phone: 92123454,
            password: yield bcrypt.hash('password1234', 15),
        });
        if (supportCenterRole) {
            yield supportCenter4.roles.push(supportCenterRole);
            yield supportCenter4.save();
        }
        const supportCenter5 = yield User_1.User.create({
            firstName: 'Jules',
            lastName: 'OUREYA',
            email: 'gendarmerieagoe@mail.com',
            phone: 72345117,
            password: yield bcrypt.hash('password1234', 15),
        });
        if (supportCenterRole) {
            yield supportCenter5.roles.push(supportCenterRole);
            yield supportCenter5.save();
        }
        const supportCenter6 = yield User_1.User.create({
            firstName: 'Achille',
            lastName: 'SEGNIKA',
            email: 'gendarmerieadamavo@mail.com',
            phone: 77234535,
            password: yield bcrypt.hash('password1234', 15),
        });
        if (supportCenterRole) {
            yield supportCenter6.roles.push(supportCenterRole);
            yield supportCenter6.save();
        }
        // Pompier
        const supportCenter7 = yield User_1.User.create({
            firstName: 'Stéphane',
            lastName: 'MWEBIDA',
            email: 'caserneavepozo@mail.com',
            phone: 90098776,
            password: yield bcrypt.hash('password1234', 15),
        });
        if (supportCenterRole) {
            yield supportCenter7.roles.push(supportCenterRole);
            yield supportCenter7.save();
        }
        const supportCenter8 = yield User_1.User.create({
            firstName: 'Lamine',
            lastName: 'TCHASSANTI',
            email: 'caserneprinicpale@mail.com',
            phone: 97561272,
            password: yield bcrypt.hash('password1234', 15),
        });
        if (supportCenterRole) {
            yield supportCenter8.roles.push(supportCenterRole);
            yield supportCenter8.save();
        }
        const supportCenter9 = yield User_1.User.create({
            firstName: 'Sabin',
            lastName: 'FAYI',
            email: 'caserneagoe@mail.com',
            phone: 99002131,
            password: yield bcrypt.hash('password1234', 15),
        });
        if (supportCenterRole) {
            yield supportCenter9.roles.push(supportCenterRole);
            yield supportCenter9.save();
        }
        console.log('Users seeded successfully');
    }
    catch (error) {
        console.log('Error while seeding users:', error);
    }
});
exports.seedUsers = seedUsers;
