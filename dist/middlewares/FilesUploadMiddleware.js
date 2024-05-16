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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = void 0;
const path = __importStar(require("path"));
const multer_1 = __importDefault(require("multer"));
const uploadFilePath = path.resolve(__dirname, '../..', 'public/uploads/files');
const storageFile = multer_1.default.diskStorage({
    destination: uploadFilePath,
    filename(req, file, fn) {
        fn(null, `${new Date().getTime().toString()}-${file.fieldname}${path.extname(file.originalname)}`);
    },
});
exports.uploadFile = (0, multer_1.default)({
    storage: storageFile,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter(req, file, callback) {
        const extension = ['.png', '.jpg', '.jpeg', '.mp4', '.mov', '.qt', '.avi', '.webm', '.m4v', '.mp3'].indexOf(path.extname(file.originalname).toLowerCase()) >= 0;
        const mimeType = ['image/png', 'image/jpeg', 'video/mp4', 'video/quicktime', 'video/webm', 'video/x-msvideo', 'video/x-m4v', 'audio/mpeg', 'audio/mp4'].indexOf(file.mimetype) >= 0;
        if (extension && mimeType) {
            return callback(null, true);
        }
        callback(new Error(`Invalid file type. Type ${file.mimetype} is not allowed!`));
    },
});
