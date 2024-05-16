import { Trouble } from "../models/Trouble"

export const seedTroubles = async () => {
    try {
        await Trouble.create({
            name: 'accident'
        });
    
        await Trouble.create({
            name: 'incendie'
        });

        await Trouble.create({
            name: 'braquage'
        });
    
        await Trouble.create({
            name: 'inondation'
        });

        await Trouble.create({
            name: 'meurtre'
        });
        console.log('Troubles seeded successfully');
    } catch (error) {
        console.log('Error while seeding troubles:', error);
    }
}