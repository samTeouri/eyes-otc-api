import { Role } from "../models/Role";
import { User } from "../models/User"

export const seedUsers = async () => {

    const citizenRole = await Role.findOne({ where: { name: 'citizen' } });
    const managerRole = await Role.findOne({ where: { name: 'manager' } });

    const citizen1 = await User.create({
        "id": "LADJ20241",
        "firstName": "Serigne",
        "lastName": "LADJI",
        "email": "sladji@mail.com",
        "phone": 90902024,
        "password": "password1234"
    });
    citizen1.addRole(citizenRole as Role);

    const citizen2 = await User.create({
        "id": "LARD20241",
        "firstName": "David",
        "lastName": "LARE",
        "email": "dlare@mail.com",
        "phone": 90992002,
        "password": "password1234"
    });
    citizen2.addRole(citizenRole as Role);

    const manager1 = await User.create({
        "id": "GANF20241",
        "firstName": "Farid",
        "lastName": "GANI",
        "email": "fgani@mail.com",
        "phone": 91311220,
        "password": "password1234"
    });
    manager1.addRole(managerRole as Role);
}
