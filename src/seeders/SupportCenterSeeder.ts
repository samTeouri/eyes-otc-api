import { Location } from '../models/Location';
import { Service } from '../models/Service';
import { SupportCenter } from '../models/SupportCenter'
import { User } from '../models/User'

export const seedSupportCenters = async () => {
    try {
        // Get services 
        const centreSante = await Service.findOne({ name: 'centre de santé' });
        const gendarmerie = await Service.findOne({ name: 'gendarmerie' });
        const pompier = await Service.findOne({ name: 'pompier' });

        // Support Center user account
        const user1 = await User.findOne({ email: 'chucampus@mail.com' });

        // Support Center Location
        const location1 = await Location.create({
            latitude: 6.182096914017006,
            longitude: 1.2172807230864593
        });

        const supportCenter1 = await SupportCenter.create({
            name: 'CHU Campus',
            service: centreSante,
            location: location1,
            user: user1,
        });

        centreSante?.supportCenters.push(supportCenter1);

        // Support Center user account
        const user2 = await User.findOne({ email: 'chusylvanusolympio@mail.com' });

        // Support Center Location
        const location2 = await Location.create({
            latitude: 6.142263366999803,
            longitude: 1.211690509638247
        });

        const supportCenter2 = await SupportCenter.create({
            name: 'CHU Sylvanus Olympio',
            service: centreSante,
            location: location2,
            user: user2,
        });

        centreSante?.supportCenters.push(supportCenter2);

        // Support Center user account
        const user3 = await User.findOne({ email: 'dogtalafie@mail.com' });

        // Support Center Location
        const location3 = await Location.create({
            latitude: 6.245769531221591,
            longitude: 1.2116005221425683
        });

        const supportCenter3 = await SupportCenter.create({
            name: 'Hôpital DOGTA-LAFIÈ',
            service: centreSante,
            location: location3,
            user: user3,
        });

        centreSante?.supportCenters.push(supportCenter3);

        // Support Center user account
        const user4 = await User.findOne({ email: 'gendarmeriesanguera@mail.com' });

        // Support Center Location
        const location4 = await Location.create({
            latitude: 6.2481109942833255,
            longitude: 1.1435564188721785
        });

        const supportCenter4 = await SupportCenter.create({
            name: 'Gendarmerie nationale de Sanguéra',
            service: gendarmerie,
            location: location4,
            user: user4,
        });

        gendarmerie?.supportCenters.push(supportCenter4);

        // Support Center user account
        const user5 = await User.findOne({ email: 'gendarmerieagoe@mail.com' });

        // Support Center Location
        const location5 = await Location.create({
            latitude: 6.2367384661083385,
            longitude: 1.2119919478631682,
        });

        const supportCenter5 = await SupportCenter.create({
            name: 'Gendarmerie brigade d\'Agoè',
            service: gendarmerie,
            location: location5,
            user: user5,
        });

        gendarmerie?.supportCenters.push(supportCenter5);

        // Support Center user account
        const user6 = await User.findOne({ email: 'gendarmerieadamavo@mail.com' });

        // Support Center Location
        const location6 = await Location.create({
            latitude: 6.178867547450334,
            longitude: 1.3119562722447586,
        });

        const supportCenter6 = await SupportCenter.create({
            name: 'Gendarmerie Adamavo',
            service: gendarmerie,
            location: location6,
            user: user6,
        });

        gendarmerie?.supportCenters.push(supportCenter6);

        // Support Center user account
        const user7 = await User.findOne({ email: 'caserneavepozo@mail.com' });

        // Support Center Location
        const location7 = await Location.create({
            latitude: 6.174592835177883,
            longitude: 1.3503943195681785,
        });

        const supportCenter7 = await SupportCenter.create({
            name: 'Poste d\'intervention avancé (Sapeur Pompiers) Avépozo',
            service: pompier,
            location: location7,
            user: user7,
        });

        pompier?.supportCenters.push(supportCenter7);

        // Support Center user account
        const user8 = await User.findOne({ email: 'caserneprinicpale@mail.com' });

        // Support Center Location
        const location8 = await Location.create({
            latitude: 6.132740008838764,
            longitude: 1.2407452955478275,
        });

        const supportCenter8 = await SupportCenter.create({
            name: 'Corps des Sapeurs-pompiers du Togo',
            service: pompier,
            location: location8,
            user: user8,
        });

        pompier?.supportCenters.push(supportCenter8);

        // Support Center user account
        const user9 = await User.findOne({ email: 'caserneagoe@mail.com' });

        // Support Center Location
        const location9 = await Location.create({
            latitude: 6.236924759589404,
            longitude: 1.2157820446448546,
        });

        const supportCenter9 = await SupportCenter.create({
            name: 'Poste d\'intervention avancé (Sapeur Pompiers) Agoè',
            service: pompier,
            location: location9,
            user: user9,
        });

        pompier?.supportCenters.push(supportCenter9);

        await centreSante?.save();
        await gendarmerie?.save();
        await pompier?.save();

        console.log('Support centers seeded successfully');
    } catch (error) {
        console.log('Error while seeding support centers:', error);
    }
}
