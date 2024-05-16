import { Service } from "../models/Service"
import { Trouble } from "../models/Trouble";

export const seedServices = async () => {
    try {
        const centreSante = await Service.create({
            name: 'centre de santé',
        });
    
        const gendarmerie = await Service.create({
            name: 'gendarmerie',
        });
    
        const pompier = await Service.create({
            name: 'pompier',
        });
    
        await Trouble.findOneAndUpdate(
            { name: 'accident' },
            { services: [centreSante, gendarmerie] }
        );
    
        await Trouble.findOneAndUpdate(
            { name: 'incendie' },
            { services: [centreSante, gendarmerie, pompier] }
        );
    
        await Trouble.findOneAndUpdate(
            { name: 'braquage' },
            { services: [centreSante, gendarmerie] }
        );
    
        await Trouble.findOneAndUpdate(
            { name: 'inondation' },
            { services: [pompier] }
        );
    
        await Trouble.findOneAndUpdate(
            { name: 'meurtre' },
            { services: [centreSante, gendarmerie] }
        );
        console.log('Services seeded successfully');
    } catch (error) {
        console.log('Error while seeding services:', error);
    }

}