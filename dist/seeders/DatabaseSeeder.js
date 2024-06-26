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
const PermissionSeeder_1 = require("./PermissionSeeder");
const RoleSeeder_1 = require("./RoleSeeder");
const UserSeeder_1 = require("./UserSeeder");
const database = __importStar(require("../config/database"));
const TroubleSeeder_1 = require("./TroubleSeeder");
const ServiceSeeder_1 = require("./ServiceSeeder");
const SupportCenterSeeder_1 = require("./SupportCenterSeeder");
const seed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database.connect();
        yield (0, RoleSeeder_1.seedRoles)();
        yield (0, UserSeeder_1.seedUsers)();
        yield (0, PermissionSeeder_1.seedPermissions)();
        yield (0, TroubleSeeder_1.seedTroubles)();
        yield (0, ServiceSeeder_1.seedServices)();
        yield (0, SupportCenterSeeder_1.seedSupportCenters)();
    }
    catch (error) {
        console.log(error);
    }
    finally {
        process.exit(0);
    }
});
seed();
