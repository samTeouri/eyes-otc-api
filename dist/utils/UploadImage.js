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
exports.handleSingleUploadImage = void 0;
const path = __importStar(require("path"));
const multer_1 = __importDefault(require("multer"));
const uploadImagePath = path.resolve(__dirname, '../..', 'public/uploads/images');
const storageImage = multer_1.default.diskStorage({
    destination: uploadImagePath,
    filename(req, image, fn) {
        fn(null, `${new Date().getTime().toString()}-${image.fieldname}${path.extname(image.originalname)}`);
    },
});
const uploadImage = (0, multer_1.default)({
    storage: storageImage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter(req, image, callback) {
        const extension = ['.png', '.jpg', '.jpeg'].indexOf(path.extname(image.originalname).toLowerCase()) >= 0;
        const mimeType = ['image/png', 'image/jpg', 'image/jpeg'].indexOf(image.mimetype) >= 0;
        if (extension && mimeType) {
            return callback(null, true);
        }
        callback(new Error('Invalid file type. Only picture file on type PNG, JPEG and JPG are allowed!'));
    },
}).single('picture');
const handleSingleUploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        uploadImage(req, res, (error) => {
            if (error) {
                reject(error);
            }
            resolve({ file: req.file, body: req.body });
        });
    });
});
exports.handleSingleUploadImage = handleSingleUploadImage;
