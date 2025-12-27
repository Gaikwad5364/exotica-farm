'use server';

import { prisma } from "@/lib/prisma";
import { sendAdminNotification, sendUserVisitUpdate, sendEnquiryAcknowledgement } from "@/lib/mail";
import { revalidatePath } from "next/cache";

export async function submitTestimonialAction(data: {
    name: string;
    role: string;
    rating: number;
    text: string;
    image?: string;
}) {
    try {
        await prisma.testimonial.create({
            data: {
                name: data.name,
                role: data.role,
                rating: data.rating,
                message: data.text,
                photo: data.image,
                status: 'pending'
            }
        });
        revalidatePath('/testimonials');
        revalidatePath('/admin/dashboard');
        revalidatePath('/admin/testimonials');
        return { success: true };
    } catch (e: any) {
        console.error("Testimonial submission error:", e);
        return {
            success: false,
            error: e instanceof Error ? e.message : "Failed to submit review"
        };
    }
}

export async function submitContactAction(data: {
    name: string;
    email: string;
    phone: string;
    message: string;
}) {
    try {
        const enquiry = await prisma.enquiry.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                message: data.message,
                type: 'contact'
            }
        });

        await sendAdminNotification('CONTACT', enquiry);
        await sendEnquiryAcknowledgement(enquiry);

        revalidatePath('/admin/dashboard');
        revalidatePath('/admin/enquiries');
        return { success: true };
    } catch (e: any) {
        console.error("Contact submission error:", e);
        return {
            success: false,
            error: e instanceof Error ? e.message : "Failed to send message"
        };
    }
}

export async function submitFarmVisitAction(data: {
    name: string;
    email: string;
    phone: string;
    message: string;
    metadata: string;
}) {
    try {
        const enquiry = await prisma.enquiry.create({
            data: {
                name: data.name,
                email: data.email,
                phone: data.phone,
                message: data.message,
                type: 'farm_visit',
                metadata: data.metadata,
                status: 'pending'
            }
        });

        await sendAdminNotification('FARM_VISIT', enquiry);
        await sendUserVisitUpdate('RECEIVED', enquiry);

        revalidatePath('/admin/dashboard');
        revalidatePath('/admin/enquiries');
        revalidatePath('/admin/farm-visits');
        return { success: true };
    } catch (e: any) {
        console.error("Farm visit submission error:", e);
        return {
            success: false,
            error: e instanceof Error ? e.message : "Failed to book visit. Please check if database is connected."
        };
    }
}
