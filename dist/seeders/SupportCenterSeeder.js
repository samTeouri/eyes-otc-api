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
exports.seedSupportCenters = void 0;
const Location_1 = require("../models/Location");
const Service_1 = require("../models/Service");
const SupportCenter_1 = require("../models/SupportCenter");
const User_1 = require("../models/User");
const seedSupportCenters = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get services 
        const centreSante = yield Service_1.Service.findOne({ name: 'centre de santé' });
        const gendarmerie = yield Service_1.Service.findOne({ name: 'gendarmerie' });
        const pompier = yield Service_1.Service.findOne({ name: 'pompier' });
        // Support Center user account
        const user1 = yield User_1.User.findOne({ email: 'chucampus@mail.com' });
        // Support Center Location
        const location1 = yield Location_1.Location.create({
            latitude: 6.182096914017006,
            longitude: 1.2172807230864593
        });
        const supportCenter1 = yield SupportCenter_1.SupportCenter.create({
            name: 'CHU Campus',
            service: centreSante,
            location: location1,
            user: user1,
        });
        centreSante === null || centreSante === void 0 ? void 0 : centreSante.supportCenters.push(supportCenter1);
        // Support Center user account
        const user2 = yield User_1.User.findOne({ email: 'chusylvanusolympio@mail.com' });
        // Support Center Location
        const location2 = yield Location_1.Location.create({
            latitude: 6.142263366999803,
            longitude: 1.211690509638247
        });
        const supportCenter2 = yield SupportCenter_1.SupportCenter.create({
            name: 'CHU Sylvanus Olympio',
            service: centreSante,
            location: location2,
            user: user2,
        });
        centreSante === null || centreSante === void 0 ? void 0 : centreSante.supportCenters.push(supportCenter2);
        // Support Center user account
        const user3 = yield User_1.User.findOne({ email: 'dogtalafie@mail.com' });
        // Support Center Location
        const location3 = yield Location_1.Location.create({
            latitude: 6.245769531221591,
            longitude: 1.2116005221425683
        });
        const supportCenter3 = yield SupportCenter_1.SupportCenter.create({
            name: 'Hôpital DOGTA-LAFIÈ',
            service: centreSante,
            location: location3,
            user: user3,
        });
        centreSante === null || centreSante === void 0 ? void 0 : centreSante.supportCenters.push(supportCenter3);
        // Support Center user account
        const user4 = yield User_1.User.findOne({ email: 'gendarmeriesanguera@mail.com' });
        // Support Center Location
        const location4 = yield Location_1.Location.create({
            latitude: 6.2481109942833255,
            longitude: 1.1435564188721785
        });
        const supportCenter4 = yield SupportCenter_1.SupportCenter.create({
            name: 'Gendarmerie nationale de Sanguéra',
            service: gendarmerie,
            location: location4,
            user: user4,
        });
        gendarmerie === null || gendarmerie === void 0 ? void 0 : gendarmerie.supportCenters.push(supportCenter4);
        // Support Center user account
        const user5 = yield User_1.User.findOne({ email: 'gendarmerieagoe@mail.com' });
        // Support Center Location
        const location5 = yield Location_1.Location.create({
            latitude: 6.2367384661083385,
            longitude: 1.2119919478631682,
        });
        const supportCenter5 = yield SupportCenter_1.SupportCenter.create({
            name: 'Gendarmerie brigade d\'Agoè',
            service: gendarmerie,
            location: location5,
            user: user5,
        });
        gendarmerie === null || gendarmerie === void 0 ? void 0 : gendarmerie.supportCenters.push(supportCenter5);
        // Support Center user account
        const user6 = yield User_1.User.findOne({ email: 'gendarmerieadamavo@mail.com' });
        // Support Center Location
        const location6 = yield Location_1.Location.create({
            latitude: 6.178867547450334,
            longitude: 1.3119562722447586,
        });
        const supportCenter6 = yield SupportCenter_1.SupportCenter.create({
            name: 'Gendarmerie Adamavo',
            service: gendarmerie,
            location: location6,
            user: user6,
        });
        gendarmerie === null || gendarmerie === void 0 ? void 0 : gendarmerie.supportCenters.push(supportCenter6);
        // Support Center user account
        const user7 = yield User_1.User.findOne({ email: 'caserneavepozo@mail.com' });
        // Support Center Location
        const location7 = yield Location_1.Location.create({
            latitude: 6.174592835177883,
            longitude: 1.3503943195681785,
        });
        const supportCenter7 = yield SupportCenter_1.SupportCenter.create({
            name: 'Poste d\'intervention avancé (Sapeur Pompiers) Avépozo',
            service: pompier,
            location: location7,
            user: user7,
        });
        pompier === null || pompier === void 0 ? void 0 : pompier.supportCenters.push(supportCenter7);
        // Support Center user account
        const user8 = yield User_1.User.findOne({ email: 'caserneprinicpale@mail.com' });
        // Support Center Location
        const location8 = yield Location_1.Location.create({
            latitude: 6.132740008838764,
            longitude: 1.2407452955478275,
        });
        const supportCenter8 = yield SupportCenter_1.SupportCenter.create({
            name: 'Corps des Sapeurs-pompiers du Togo',
            service: pompier,
            location: location8,
            user: user8,
        });
        pompier === null || pompier === void 0 ? void 0 : pompier.supportCenters.push(supportCenter8);
        // Support Center user account
        const user9 = yield User_1.User.findOne({ email: 'caserneagoe@mail.com' });
        // Support Center Location
        const location9 = yield Location_1.Location.create({
            latitude: 6.236924759589404,
            longitude: 1.2157820446448546,
        });
        const supportCenter9 = yield SupportCenter_1.SupportCenter.create({
            name: 'Poste d\'intervention avancé (Sapeur Pompiers) Agoè',
            service: pompier,
            location: location9,
            user: user9,
        });
        pompier === null || pompier === void 0 ? void 0 : pompier.supportCenters.push(supportCenter9);
        yield (centreSante === null || centreSante === void 0 ? void 0 : centreSante.save());
        yield (gendarmerie === null || gendarmerie === void 0 ? void 0 : gendarmerie.save());
        yield (pompier === null || pompier === void 0 ? void 0 : pompier.save());
        console.log('Support centers seeded successfully');
    }
    catch (error) {
        console.log('Error while seeding support centers:', error);
    }
});
exports.seedSupportCenters = seedSupportCenters;
