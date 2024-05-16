import { Role } from "../models/Role";

export const seedRoles = async () => {
    try {
        await Role.insertMany([
            { name: 'citizen' },
            { name: 'supportCenter' },
            { name: 'manager' },
        ]);
        console.log('Roles seeded successfully');
    } catch (error) {
        console.log('Error while seeding roles:', error);
    }
}