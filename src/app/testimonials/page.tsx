export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import TestimonialsContent from "./TestimonialsContent";

const INITIAL_TESTIMONIALS = [
    {
        name: 'Rohan Sharma',
        role: 'Regular Customer',
        message: 'Best mushrooms in the city! Just received my weekly box of Oyster and Button mushrooms. They were still cool from the harvest. Truly exceptional quality.',
        rating: 5,
        photo: 'https://images.unsplash.com/photo-1591254512490-309199920379?auto=format&fit=crop&q=80&w=800'
    },
    {
        name: 'Priya Patel',
        role: 'Restaurant Owner',
        message: "Just look at these colors! Our kitchen staff loves working with fresh bell peppers from Exotica. The crunch and flavor are unmatched in any local market.",
        rating: 5,
        photo: 'https://images.unsplash.com/photo-1592924357228-91a4eaadcbea?auto=format&fit=crop&q=80&w=800'
    },
    {
        name: 'Dr. A. Kumar',
        role: 'Agriculture Specialist',
        message: 'A glimpse into the future of Indian farming. Managed to visit their smart polyhouse today. The level of climate control and automation is world-class.',
        rating: 4,
        photo: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&q=80&w=800'
    }
];

export const metadata = {
    title: 'Testimonials | Exotica Farm',
    description: 'Discover why customers love our fresh produce and modern farming approach.',
};

export default async function TestimonialsPage() {
    let testimonials = [];

    try {
        // Attempt to fetch from DB
        const count = await prisma.testimonial.count();
        if (count === 0) {
            await prisma.testimonial.createMany({
                data: INITIAL_TESTIMONIALS.map(t => ({ ...t, status: 'approved' }))
            });
        }

        testimonials = await prisma.testimonial.findMany({
            where: { status: 'approved' },
            orderBy: { createdAt: 'desc' }
        });
    } catch (error) {
        console.error("Database connection error on testimonials page:", error);
        // Fallback to initial data if DB fails
        testimonials = INITIAL_TESTIMONIALS.map((t, i) => ({
            ...t,
            id: `fallback-${i}`,
            status: 'approved',
            createdAt: new Date(),
            rejectionReason: null
        }));
    }

    return <TestimonialsContent initialTestimonials={testimonials as any} />;
}
