import { seedPermissions } from "./PermissionSeeder";
import { seedRoles } from "./RoleSeeder";
import { seedUsers } from "./UserSeeder";

const seed = async () => {
    await seedRoles(),
    await seedUsers(),
    await seedPermissions()
};

seed();