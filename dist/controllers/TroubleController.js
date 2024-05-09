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
exports.getTroubles = void 0;
const Trouble_1 = require("../models/Trouble");
const getTroubles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const troubles = yield Trouble_1.Trouble.find();
        res.status(200).json({ troubles: troubles });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error while getting troubles' });
    }
});
exports.getTroubles = getTroubles;
