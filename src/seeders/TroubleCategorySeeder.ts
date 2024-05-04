import { TroubleCategory } from "../models/TroubleCategory";

export const seedTroubleCategories = async () => {
    await TroubleCategory.bulkCreate([
        { name: 'accident' },
        { name: 'incendie' },
        { name: 'vol' },
    ]);
}