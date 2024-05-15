import { seedPermissions } from "./PermissionSeeder";
import { seedRoles } from "./RoleSeeder";
import { seedUsers } from "./UserSeeder";
import * as database from '../config/database';

const seed = async () => {
    try {
        await database.connect();
        await seedRoles();
        await seedUsers();
        await seedPermissions();
    } catch (error) {
        console.log(error);
    } finally {
        process.exit(0);
    }
};

seed();