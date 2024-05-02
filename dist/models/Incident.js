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
exports.Incident = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const SupportCenter_1 = require("./SupportCenter");
const Notification_1 = require("./Notification");
const Trouble_1 = require("./Trouble");
const IncidentTrouble_1 = require("./IncidentTrouble");
const User_1 = require("./User");
const OSMRoutingService_1 = require("../services/OSMRoutingService");
class Incident extends sequelize_1.Model {
    constructor() {
        super(...arguments);
        this.osrm = new OSMRoutingService_1.OSMRoutingService();
    }
    getDistanceToSupportCenter(supporterCenter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.osrm.getDistance([(yield this.getLocation()).longitude, (yield this.getLocation()).latitude], [(yield supporterCenter.getLocation()).longitude, (yield supporterCenter.getLocation()).latitude]);
        });
    }
    getNearestSupportCenter(supportCenters) {
        return __awaiter(this, void 0, void 0, function* () {
            let distance = 1000000000000;
            let nearestSupportCenter = new SupportCenter_1.SupportCenter();
            supportCenters.forEach((supportCenter) => __awaiter(this, void 0, void 0, function* () {
                let distanceToSupportCenter = yield this.getDistanceToSupportCenter(supportCenter);
                if (typeof distanceToSupportCenter === 'number') {
                    if (distance > distanceToSupportCenter) {
                        distance = distanceToSupportCenter;
                        nearestSupportCenter = supportCenter;
                    }
                }
            }));
            return nearestSupportCenter;
        });
    }
    getConcernedSupportCenters() {
        return __awaiter(this, void 0, void 0, function* () {
            let supportCenters = [];
            (yield this.getTroubles()).flatMap((trouble) => __awaiter(this, void 0, void 0, function* () {
                (yield trouble.getServices()).flatMap((service) => __awaiter(this, void 0, void 0, function* () {
                    let supportCenter = yield this.getNearestSupportCenter(yield service.getSupportCenters());
                    supportCenters.push(supportCenter);
                }));
            }));
            supportCenters = supportCenters.filter((supportCenter, index) => {
                supportCenters.indexOf(supportCenter) === index;
            });
            return supportCenters;
        });
    }
}
exports.Incident = Incident;
Incident.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    state: {
        type: sequelize_1.DataTypes.ENUM('traitement en cours', 'en attente de traitement', 'résolu'),
        allowNull: false,
        defaultValue: 'en attente de traitement',
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    picture: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    video: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    sequelize: database_1.sequelize,
    modelName: 'Incident',
    tableName: 'incidents'
});
Incident.belongsToMany(SupportCenter_1.SupportCenter, {
    through: Notification_1.Notification,
    foreignKey: 'incident_id'
});
Incident.belongsToMany(Trouble_1.Trouble, {
    through: IncidentTrouble_1.IncidentTrouble,
    foreignKey: 'incident_id'
});
Incident.belongsTo(User_1.User, {
    foreignKey: 'user_id'
});
SupportCenter_1.SupportCenter.belongsToMany(Incident, {
    through: Notification_1.Notification,
    foreignKey: 'support_center_id'
});
Trouble_1.Trouble.belongsToMany(Incident, {
    through: IncidentTrouble_1.IncidentTrouble,
    foreignKey: 'trouble_id'
});
