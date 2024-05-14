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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authVerifyToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const authVerifyToken = (req, res, next) => {
    const accessToken = req.header('Authorization-Token');
    const refreshToken = req.header('Refresh-Token');
    if (!accessToken && !refreshToken)
        return res.status(401).json({ error: 'Access denied. No token provided' });
    try {
        const decoded = jwt.verify(accessToken, process.env.TOKEN_SECRET_KEY);
        req.body.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        if (!refreshToken) {
            return res.status(401).send('Access Denied. No refresh token provided.');
        }
        try {
            const decoded = jwt.verify(refreshToken, process.env.TOKEN_SECRET_KEY);
            const accessToken = jwt.sign({ id: decoded.id }, process.env.TOKEN_SECRET_KEY, { expiresIn: '1h' });
            return res.status(200).json({
                user: decoded.id,
                _token: accessToken,
                _refreshToken: refreshToken
            });
        }
        catch (error) {
            return res.status(400).send('Invalid Token.');
        }
    }
};
exports.authVerifyToken = authVerifyToken;
