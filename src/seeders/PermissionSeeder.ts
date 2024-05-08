import { Permission } from "../models/Permission";
import { Role } from "../models/Role";

export const seedPermissions = async () => {
    try {
        // Find citizen role
        const citizenRole = await Role.findOne({ name: 'citizen' });

        // Create citizen permissions
        const citizenPermissions = await Permission.insertMany([
            { name: 'create_incident' },
        ]);

        // Set permissions to citizen role
        if (citizenRole) {
            citizenPermissions.forEach(async (citizenPermission) => {
                citizenRole.permissions.push(citizenPermission);
            })
            await citizenRole.save();
        }

        // Find manager role
        const managerRole = await Role.findOne({ name: 'manager' });

        // Create manager permissions
        const managerPermissions = await Permission.insertMany([
            { name: 'create_notification' },
        ]);

        // Set permissions to manager role
        if (managerRole) {
            managerPermissions.forEach(async (citizenPermission) => {
                managerRole.permissions.push(citizenPermission);
            })
            await managerRole.save();
        }

        console.log('Permissions seeded successfully');
    } catch (error) {
        console.log('Error while seeding permissions:', error);
    }
}