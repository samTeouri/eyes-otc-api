import { Role } from "../models/Role";

export const seedRoles = async () => {
    await Role.insertMany([
        { name: 'citizen' },
        { name: 'supportCenter' },
        { name: 'manager' },
    ]);
}