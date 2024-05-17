import { Service } from "../models/Service"
import { ITrouble, Trouble } from "../models/Trouble";

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
    
        const accident = await Trouble.findOneAndUpdate(
            { name: 'accident' },
            { services: [centreSante, gendarmerie] }
        );
    
        const incendie = await Trouble.findOneAndUpdate(
            { name: 'incendie' },
            { services: [centreSante, gendarmerie, pompier] }
        );
    
        const braquage = await Trouble.findOneAndUpdate(
            { name: 'braquage' },
            { services: [gendarmerie] }
        );
    
        const inondation = await Trouble.findOneAndUpdate(
            { name: 'inondation' },
            { services: [pompier] }
        );
    
        const meurtre = await Trouble.findOneAndUpdate(
            { name: 'meurtre' },
            { services: [centreSante, gendarmerie] }
        );

        centreSante.troubles = [accident as ITrouble, incendie as ITrouble, meurtre as ITrouble];
        await centreSante.save();
        gendarmerie.troubles = [accident as ITrouble, incendie as ITrouble, meurtre as ITrouble, braquage as ITrouble];
        await gendarmerie.save();
        pompier.troubles = [incendie as ITrouble, inondation as ITrouble];
        await pompier.save();

        console.log('Services seeded successfully');
    } catch (error) {
        console.log('Error while seeding services:', error);
    }

}