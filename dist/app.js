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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const IncidentRoutes_1 = require("./routes/IncidentRoutes");
const AuthRoutes_1 = require("./routes/AuthRoutes");
const database = __importStar(require("./config/database"));
const cors_1 = __importDefault(require("cors"));
const TroubleRoutes_1 = require("./routes/TroubleRoutes");
const SupportCenterRoutes_1 = require("./routes/SupportCenterRoutes");
const UserRoutes_1 = require("./routes/UserRoutes");
exports.app = (0, express_1.default)();
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to the database
        yield database.connect();
        console.log('Database connected successfully');
    }
    catch (error) {
        console.error(`Database connection failed: ${error}`);
    }
}))();
// Middlewares
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
// Routes
// Incident routes
exports.app.use('/incidents', IncidentRoutes_1.incidentRouter);
// Authentication routes
exports.app.use('/auth', AuthRoutes_1.authRoutes);
// Trouble routes
exports.app.use('/troubles', TroubleRoutes_1.troubleRouter);
// Support Centers routes
exports.app.use('/supportCenter', SupportCenterRoutes_1.supportCenterRouter);
// Users routes
exports.app.use('/user', UserRoutes_1.userRouter);
