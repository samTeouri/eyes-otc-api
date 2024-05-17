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
exports.seedServices = void 0;
const Service_1 = require("../models/Service");
const Trouble_1 = require("../models/Trouble");
const seedServices = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const centreSante = yield Service_1.Service.create({
            name: 'centre de santé',
        });
        const gendarmerie = yield Service_1.Service.create({
            name: 'gendarmerie',
        });
        const pompier = yield Service_1.Service.create({
            name: 'pompier',
        });
        const accident = yield Trouble_1.Trouble.findOneAndUpdate({ name: 'accident' }, { services: [centreSante, gendarmerie] });
        const incendie = yield Trouble_1.Trouble.findOneAndUpdate({ name: 'incendie' }, { services: [centreSante, gendarmerie, pompier] });
        const braquage = yield Trouble_1.Trouble.findOneAndUpdate({ name: 'braquage' }, { services: [gendarmerie] });
        const inondation = yield Trouble_1.Trouble.findOneAndUpdate({ name: 'inondation' }, { services: [pompier] });
        const meurtre = yield Trouble_1.Trouble.findOneAndUpdate({ name: 'meurtre' }, { services: [centreSante, gendarmerie] });
        centreSante.troubles = [accident, incendie, meurtre];
        yield centreSante.save();
        gendarmerie.troubles = [accident, incendie, meurtre, braquage];
        yield gendarmerie.save();
        pompier.troubles = [incendie, inondation];
        yield pompier.save();
        console.log('Services seeded successfully');
    }
    catch (error) {
        console.log('Error while seeding services:', error);
    }
});
exports.seedServices = seedServices;
