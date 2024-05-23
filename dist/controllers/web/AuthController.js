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
exports.refreshAccessToken = exports.adminLogout = exports.adminLogin = exports.getAdminLogin = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const AuthService_1 = require("../../services/AuthService");
const RequestValidationService_1 = require("../../services/RequestValidationService");
const RoleService_1 = require("../../services/RoleService");
const authService = new AuthService_1.AuthService();
const roleService = new RoleService_1.RoleService();
const requestValidationService = new RequestValidationService_1.RequestValidationService();
// Admin login page
const getAdminLogin = (req, res) => {
    return res.render('pages/login');
};
exports.getAdminLogin = getAdminLogin;
// Admin login
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);
        // Get user register form values from body
        const { identifier, password } = req.body;
        // Get user instance using given identifier
        const user = yield authService.getUserByIdentifier(identifier);
        // User with given identifier exist
        if (user) {
            // await Role.findOne({ name: 'manager' })
            //     .then(async (role: IRole | null) => {
            //         if (role) {
            //             roleService.checkRole(user, role, res);
            //         }
            //     })
            //     .catch(async (reason: any) => {
            //         throw reason;
            //     })
            const userLoggedIn = yield authService.userWebLogging(user, password, req);
            if (!userLoggedIn) {
                return res.redirect('/auth/login');
            }
            return res.redirect('/dashboard');
        }
        else {
            req.session.errorMessage = 'Aucun utilisateur n\'est enregistré avec cet email';
            return res.redirect('/auth/login');
        }
    }
    catch (error) {
        console.log(error);
        req.session.errorMessage = 'Erreur lors de la connexion contactez l\'administrateur du site';
        return res.redirect('/auth/login');
    }
});
exports.adminLogin = adminLogin;
const adminLogout = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return next(err);
        }
        res.redirect('/auth/login');
    });
};
exports.adminLogout = adminLogout;
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.header('Refresh-Token');
    if (!refreshToken) {
        return res.status(401).send('Access Denied. No refresh token provided.');
    }
    try {
        const decoded = jwt.verify(refreshToken, process.env.TOKEN_SECRET_KEY);
        const accessToken = jwt.sign({ id: decoded.id }, process.env.TOKEN_SECRET_KEY, { expiresIn: '2h' });
        return res.status(200).json({
            userId: decoded.id,
            _token: accessToken,
            _refreshToken: refreshToken
        });
    }
    catch (error) {
        return res.status(400).send('Invalid refresh token.');
    }
});
exports.refreshAccessToken = refreshAccessToken;
