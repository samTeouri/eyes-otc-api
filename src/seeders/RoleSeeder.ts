import { Role } from "../models/Role";

export const seedRoles = async () => {
    try {
        await Role.insertMany([
            { name: 'citizen' },
            { name: 'supportCenter' },
            { name: 'manager' },
        ]);
    } catch (error) {
        console.log('Roles seeded succesfully');
    }
}