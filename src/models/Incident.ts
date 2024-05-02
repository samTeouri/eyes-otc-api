import { BelongsToManyAddAssociationMixin, BelongsToManyAddAssociationsMixin, BelongsToManyCreateAssociationMixin, BelongsToManyGetAssociationsMixin, BelongsToManyHasAssociationMixin, BelongsToManyHasAssociationsMixin, BelongsToManyRemoveAssociationMixin, BelongsToManyRemoveAssociationsMixin, BelongsToManySetAssociationsMixin, DataTypes, HasOneCreateAssociationMixin, HasOneGetAssociationMixin, HasOneSetAssociationMixin, Model } from 'sequelize';
import { sequelize } from '../config/database';
import { SupportCenter } from './SupportCenter';
import { Notification } from './Notification';
import { Trouble } from './Trouble';
import { IncidentTrouble } from './IncidentTrouble';
import { User } from './User';
import { OSMRoutingService } from '../services/OSMRoutingService';
import { Location } from './Location';

export class Incident extends Model {
    declare id: BigInteger;
    declare state: string;
    declare description: string;
    declare picture: string;
    declare video: string;
    declare userId: string;
    declare createdAt: Date;
    declare updateAt: Date;

    declare getTroubles: BelongsToManyGetAssociationsMixin<Trouble>;
    declare setTroubles: BelongsToManySetAssociationsMixin<Trouble, number>;
    declare hasTrouble: BelongsToManyHasAssociationMixin<Trouble, number>;
    declare hasTroubles: BelongsToManyHasAssociationsMixin<Trouble, number>;
    declare addTrouble: BelongsToManyAddAssociationMixin<Trouble, number>;
    declare addTroubles: BelongsToManyAddAssociationsMixin<Trouble, number>;
    declare removeTrouble: BelongsToManyRemoveAssociationMixin<Trouble, number>;
    declare removeTroubles: BelongsToManyRemoveAssociationsMixin<Trouble, number>;
    declare createTrouble: BelongsToManyCreateAssociationMixin<Trouble>;

    declare getSupportCenters: BelongsToManyGetAssociationsMixin<SupportCenter>;
    declare setSupportCenters: BelongsToManySetAssociationsMixin<SupportCenter, number>;
    declare hasSupportCenter: BelongsToManyHasAssociationMixin<SupportCenter, number>;
    declare hasSupportCenters: BelongsToManyHasAssociationsMixin<SupportCenter, number>;
    declare addSupportCenter: BelongsToManyAddAssociationMixin<SupportCenter, number>;
    declare addSupportCenters: BelongsToManyAddAssociationsMixin<SupportCenter, number>;
    declare removeSupportCenter: BelongsToManyRemoveAssociationMixin<SupportCenter, number>;
    declare removeSupportCenters: BelongsToManyRemoveAssociationsMixin<SupportCenter, number>;
    declare createSupportCenter: BelongsToManyCreateAssociationMixin<SupportCenter>;

    declare getLocation: HasOneGetAssociationMixin<Location>;
    declare setLocation: HasOneSetAssociationMixin<Location, number>;
    declare createLocation: HasOneCreateAssociationMixin<Location>;

    osrm = new OSMRoutingService();

    async getDistanceToSupportCenter(supporterCenter: SupportCenter): Promise<number | void> {
        return this.osrm.getDistance([(await this.getLocation()).longitude, (await this.getLocation()).latitude], [(await supporterCenter.getLocation()).longitude, (await supporterCenter.getLocation()).latitude])
    }

    async getNearestSupportCenter(supportCenters: SupportCenter[]): Promise<SupportCenter> {
        let distance: number = 1000000000000;
        let nearestSupportCenter: SupportCenter = new SupportCenter();

        supportCenters.forEach(async supportCenter => {
            let distanceToSupportCenter = await this.getDistanceToSupportCenter(supportCenter);

            if (typeof distanceToSupportCenter === 'number') {
                if (distance > distanceToSupportCenter) {
                    distance = distanceToSupportCenter;
                    nearestSupportCenter = supportCenter;
                }
            }
        });

        return nearestSupportCenter;
    }

    async getConcernedSupportCenters(): Promise<SupportCenter[]> {
        let supportCenters: SupportCenter[] = [];
        
        (await this.getTroubles()).flatMap(async (trouble) => {
            (await trouble.getServices()).flatMap(async (service) => {
                let supportCenter = await this.getNearestSupportCenter(await service.getSupportCenters());
                supportCenters.push(supportCenter);
            });
        });

        supportCenters = supportCenters.filter((supportCenter, index) => {
            supportCenters.indexOf(supportCenter) === index
        })

        return supportCenters;
    }
}

Incident.init(
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        state: {
            type: DataTypes.ENUM('traitement en cours', 'en attente de traitement', 'résolu'),
            allowNull: false,
            defaultValue: 'en attente de traitement',
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        video: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize: sequelize,
        modelName: 'Incident',
        tableName: 'incidents'
    }
);

Incident.belongsToMany(SupportCenter, {
    through: Notification,
    foreignKey: 'incident_id'
});

Incident.belongsToMany(Trouble, {
    through: IncidentTrouble,
    foreignKey: 'incident_id'
});

Incident.belongsTo(User, {
    foreignKey: 'user_id'
});

SupportCenter.belongsToMany(Incident, {
    through: Notification,
    foreignKey: 'support_center_id'
});

Trouble.belongsToMany(Incident, {
    through: IncidentTrouble,
    foreignKey: 'trouble_id'
});