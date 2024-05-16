import { seedPermissions } from "./PermissionSeeder";
import { seedRoles } from "./RoleSeeder";
import { seedUsers } from "./UserSeeder";
import * as database from '../config/database';
import { seedTroubles } from "./TroubleSeeder";
import { seedServices } from "./ServiceSeeder";
import { seedSupportCenters } from "./SupportCenterSeeder";

const seed = async () => {
    try {
        await database.connect();
        await seedRoles();
        await seedUsers();
        await seedPermissions();
        await seedTroubles();
        await seedServices();
        await seedSupportCenters();
    } catch (error) {
        console.log(error);
    } finally {
        process.exit(0);
    }
};

seed();