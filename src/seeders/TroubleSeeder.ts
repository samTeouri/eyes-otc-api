import { Trouble } from "../models/Trouble"

export const seedTroubles = async () => {
    Trouble.create({
        name: 'accident'
    });
}