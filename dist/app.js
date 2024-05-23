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
const express_session_1 = __importDefault(require("express-session"));
const database = __importStar(require("./config/database"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const IncidentRoutes_1 = require("./routes/api/IncidentRoutes");
const AuthRoutes_1 = require("./routes/api/AuthRoutes");
const TroubleRoutes_1 = require("./routes/api/TroubleRoutes");
const SupportCenterRoutes_1 = require("./routes/api/SupportCenterRoutes");
const UserRoutes_1 = require("./routes/api/UserRoutes");
const AuthRoutes_2 = require("./routes/web/AuthRoutes");
const ViewsRoutes_1 = require("./routes/web/ViewsRoutes");
const AuthMiddlewares_1 = require("./middlewares/AuthMiddlewares");
const FlashMessagesMiddleware_1 = require("./middlewares/FlashMessagesMiddleware");
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
exports.app = (0, express_1.default)();
// Set the view engine to ejs
exports.app.set('view engine', 'ejs');
// Set static folders
exports.app.use(express_1.default.static('public'));
exports.app.use(express_1.default.static('node_modules'));
// Set session
exports.app.use((0, express_session_1.default)({
    secret: 'ANDJ673+=22YvrfdIS2E22AE2eNJKF92',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 2 * 60 * 60 * 1000,
    }
}));
// Middleware for checking if user is authenticated
exports.app.use(AuthMiddlewares_1.isAuthenticated);
// Middleware to set flash messages
exports.app.use(FlashMessagesMiddleware_1.setFlashMessages);
// Cross-Origin Middleware
exports.app.use((0, cors_1.default)());
// Parse request and put data in body
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
// API Routes
// Incident routes
exports.app.use('/api/incidents', IncidentRoutes_1.incidentRouter);
// Authentication routes
exports.app.use('/api/auth', AuthRoutes_1.authRoutes);
// Trouble routes
exports.app.use('/api/troubles', TroubleRoutes_1.troubleRouter);
// Support Centers routes
exports.app.use('/api/supportCenter', SupportCenterRoutes_1.supportCenterRouter);
// Users routes
exports.app.use('/api/user', UserRoutes_1.userRouter);
// Web Routes
// Authentication Routes
exports.app.use('/auth', AuthRoutes_2.adminAuthRoutes);
// Views Routes
exports.app.use('/', ViewsRoutes_1.viewsRoutes);
