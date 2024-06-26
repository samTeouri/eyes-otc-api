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
exports.RequestValidationService = void 0;
const express_validator_1 = require("express-validator");
const User_1 = require("../models/User");
class RequestValidationService {
    constructor() {
        // validate request using express-validator 
        this.validateRequest = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const errors = yield (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
        });
        // validate auth identifier
        this.validateIdentifier = (value, field) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { [field]: value } });
            if (user) {
                return Promise.reject(`${field} already registered`);
            }
        });
    }
}
exports.RequestValidationService = RequestValidationService;
