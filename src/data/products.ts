export const products = [
    {
        id: '1',
        name: 'Button Mushrooms',
        description: 'Fresh, organic white button mushrooms grown in controlled environments.',
        longDescription: 'Our Button Mushrooms are cultivated ensuring the highest hygiene standards. They are rich in protein and harvested at the perfect size for diverse culinary uses.',
        image: '/images/mushroom.png',
        slug: 'mushroom',
        details: {
            plantationTime: 'Year-round (Controlled Environment)',
            growthPeriod: '3-4 weeks',
            harvestingTime: 'Daily',
            method: 'Polyhouse / Climate Controlled Rooms',
            practices: 'Residue-free, Organic compost'
        }
    },
    {
        id: '2',
        name: 'Bell Peppers (Capsicum)',
        description: 'Vibrant red and yellow capsicums rich in vitamins and flavor.',
        longDescription: 'Our colored capsicums are known for their thick walls, crunchy texture, and sweet flavor. Grown in polyhouses, they are free from environmental pollutants.',
        image: '/images/bell-pepper.png',
        slug: 'bell-pepper',
        details: {
            plantationTime: 'August - September',
            growthPeriod: '70-90 days',
            harvestingTime: 'Continuous for 6-8 months',
            method: 'Polyhouse',
            practices: 'Integrated Pest Management (IPM)'
        }
    },
    {
        id: '3',
        name: 'English Cucumber',
        description: 'Crunchy and hydrating cucumbers harvested daily.',
        longDescription: 'Seedless, thin-skinned English cucumbers. Perfect for salads and healthy snacking. Grown vertically to ensure straight fruits and uniform green color.',
        image: '/images/cucumber.png',
        slug: 'cucumber',
        details: {
            plantationTime: 'February - March / September - October',
            growthPeriod: '35-45 days',
            harvestingTime: 'Daily for 3-4 months',
            method: 'Polyhouse / Shade Net',
            practices: 'Water-efficient Drip Irrigation'
        }
    }
];

export function getProductBySlug(slug: string) {
    return products.find(p => p.slug === slug);
}
