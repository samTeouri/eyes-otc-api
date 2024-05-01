import { Permission } from "../models/Permission";
import { Role } from "../models/Role"

export const seedPermissions = async () => {
    const citizenRole = await Role.findOne({where: {name: 'citizen'}});
    const citizenPermissions = await Permission.bulkCreate([
        { name: 'create_incident' },
    ]);
    citizenRole?.setPermissions(citizenPermissions);

    const managerRole = await Role.findOne({where: {name: 'manager'}});
    const managerPermissions = await Permission.bulkCreate([
        { name: 'create_notification' },
    ]);
    managerRole?.setPermissions(managerPermissions);
}