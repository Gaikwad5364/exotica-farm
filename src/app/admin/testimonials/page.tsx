export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";
import TestimonialClient from "./TestimonialClient";

export default async function AdminTestimonials() {
    const testimonials = await prisma.testimonial.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div>
            <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', color: '#1a1a1a', marginBottom: '8px' }}>Testimonials</h1>
                    <p style={{ color: '#666' }}>Manage public reviews and add official testimonials.</p>
                </div>
            </div>

            <TestimonialClient initialData={testimonials} />
        </div>
    );
}
