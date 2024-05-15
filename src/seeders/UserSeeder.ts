import { IRole, Role } from "../models/Role";
import { User } from "../models/User";

export const seedUsers = async () => {
    try {
        // Find citizen role
        const citizenRole = await Role.findOne({ name: 'citizen' });

        // Find manager role
        const managerRole = await Role.findOne({ name: 'manager' });

        // Create citizen users
        const citizen1 = await User.create({
            id: "LADJ20241",
            firstName: "Serigne",
            lastName: "LADJI",
            email: "sladji@mail.com",
            phone: 90902024,
            password: "password1234"
        });
        if (citizenRole) {
            await citizen1.roles.push(citizenRole as IRole);
            await citizen1.save();
        }

        const citizen2 = await User.create({
            id: "LARD20241",
            firstName: "David",
            lastName: "LARE",
            email: "dlare@mail.com",
            phone: 90992002,
            password: "password1234"
        });
        if (citizenRole) {
            await citizen2.roles.push(citizenRole as IRole);
            await citizen2.save();
        }

        // Create manager users
        const manager1 = await User.create({
            id: "GANF20241",
            firstName: "Farid",
            lastName: "GANI",
            email: "fgani@mail.com",
            phone: 91311220,
            password: "password1234"
        });
        if (managerRole) {
            await manager1.roles.push(managerRole as IRole);
            await manager1.save();
        }

        console.log('Users seeded successfully');
    } catch (error) {
        console.log('Error while seeding users:', error);
    }
}
