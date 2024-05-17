import { IRole, Role } from '../models/Role';
import { User } from '../models/User';
import * as bcrypt from 'bcrypt';

export const seedUsers = async () => {
    try {
        // Find citizen role
        const citizenRole = await Role.findOne({ name: 'citizen' });

        // Find manager role
        const managerRole = await Role.findOne({ name: 'manager' });

        // Find support center role
        const supportCenterRole = await Role.findOne({ name: 'supportCenter' });

        // Create citizen users
        const citizen1 = await User.create({
            firstName: 'Serigne',
            lastName: 'LADJI',
            email: 'sladji@mail.com',
            phone: 90902024,
            password: await bcrypt.hash('password1234', 15),
        });
        if (citizenRole) {
            await citizen1.roles.push(citizenRole as IRole);
            await citizen1.save();
        }

        const citizen2 = await User.create({
            firstName: 'David',
            lastName: 'LARE',
            email: 'dlare@mail.com',
            phone: 90992002,
            password: await bcrypt.hash('password1234', 15),
        });
        if (citizenRole) {
            await citizen2.roles.push(citizenRole as IRole);
            await citizen2.save();
        }

        // Create manager users
        const manager1 = await User.create({
            firstName: 'Farid',
            lastName: 'GANI',
            email: 'fgani@mail.com',
            phone: 91311220,
            password: await bcrypt.hash('password1234', 15),
        });
        if (managerRole) {
            await manager1.roles.push(managerRole as IRole);
            await manager1.save();
        }

        // Create support centers users
        // Centres de santé
        const supportCenter1 = await User.create({
            firstName: 'Julien',
            lastName: 'LAWSON',
            email: 'chucampus@mail.com',
            phone: 97341321,
            password: await bcrypt.hash('password1234', 15),
        });
        if (supportCenterRole) {
            await supportCenter1.roles.push(supportCenterRole as IRole);
            await supportCenter1.save();
        }

        const supportCenter2 = await User.create({
            firstName: 'Djamal',
            lastName: 'ABOU',
            email: 'chusylvanusolympio@mail.com',
            phone: 93677654,
            password: await bcrypt.hash('password1234', 15),
        });
        if (supportCenterRole) {
            await supportCenter2.roles.push(supportCenterRole as IRole);
            await supportCenter2.save();
        }

        const supportCenter3 = await User.create({
            firstName: 'Roger',
            lastName: 'LEMOU',
            email: 'dogtalafie@mail.com',
            phone: 99233212,
            password: await bcrypt.hash('password1234', 15),
        });
        if (supportCenterRole) {
            await supportCenter3.roles.push(supportCenterRole as IRole);
            await supportCenter3.save();
        }

        // Gendarmeries
        const supportCenter4 = await User.create({
            firstName: 'Hodabalo',
            lastName: 'SIMFEYI',
            email: 'gendarmeriesanguera@mail.com',
            phone: 92123454,
            password: await bcrypt.hash('password1234', 15),
        });
        if (supportCenterRole) {
            await supportCenter4.roles.push(supportCenterRole as IRole);
            await supportCenter4.save();
        }

        const supportCenter5 = await User.create({
            firstName: 'Jules',
            lastName: 'OUREYA',
            email: 'gendarmerieagoe@mail.com',
            phone: 72345117,
            password: await bcrypt.hash('password1234', 15),
        });
        if (supportCenterRole) {
            await supportCenter5.roles.push(supportCenterRole as IRole);
            await supportCenter5.save();
        }

        const supportCenter6 = await User.create({
            firstName: 'Achille',
            lastName: 'SEGNIKA',
            email: 'gendarmerieadamavo@mail.com',
            phone: 77234535,
            password: await bcrypt.hash('password1234', 15),
        });
        if (supportCenterRole) {
            await supportCenter6.roles.push(supportCenterRole as IRole);
            await supportCenter6.save();
        }

        // Pompier
        const supportCenter7 = await User.create({
            firstName: 'Stéphane',
            lastName: 'MWEBIDA',
            email: 'caserneavepozo@mail.com',
            phone: 90098776,
            password: await bcrypt.hash('password1234', 15),
        });
        if (supportCenterRole) {
            await supportCenter7.roles.push(supportCenterRole as IRole);
            await supportCenter7.save();
        }

        const supportCenter8 = await User.create({
            firstName: 'Lamine',
            lastName: 'TCHASSANTI',
            email: 'caserneprinicpale@mail.com',
            phone: 97561272,
            password: await bcrypt.hash('password1234', 15),
        });
        if (supportCenterRole) {
            await supportCenter8.roles.push(supportCenterRole as IRole);
            await supportCenter8.save();
        }

        const supportCenter9 = await User.create({
            firstName: 'Sabin',
            lastName: 'FAYI',
            email: 'caserneagoe@mail.com',
            phone: 99002131,
            password: await bcrypt.hash('password1234', 15),
        });
        if (supportCenterRole) {
            await supportCenter9.roles.push(supportCenterRole as IRole);
            await supportCenter9.save();
        }

        console.log('Users seeded successfully');
    } catch (error) {
        console.log('Error while seeding users:', error);
    }
}
