'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function approveTestimonial(id: string) {
    try {
        await prisma.testimonial.update({
            where: { id },
            data: { status: 'approved' }
        });
        revalidatePath('/testimonials');
        revalidatePath('/admin/testimonials');
        return { success: true };
    } catch (e) {
        return { success: false };
    }
}

export async function deleteTestimonial(id: string) {
    try {
        await prisma.testimonial.delete({
            where: { id }
        });
        revalidatePath('/testimonials');
        revalidatePath('/admin/testimonials');
        return { success: true };
    } catch (e) {
        return { success: false };
    }
}

export async function addAdminTestimonial(data: any) {
    try {
        const testimonial = await prisma.testimonial.create({
            data: {
                ...data,
                status: 'approved'
            }
        });
        revalidatePath('/testimonials');
        revalidatePath('/admin/testimonials');
        return { success: true, data: testimonial };
    } catch (e) {
        console.error(e);
        return { success: false };
    }
}

export async function rejectTestimonial(id: string) {
    try {
        await prisma.testimonial.update({
            where: { id },
            data: { status: 'rejected' }
        });
        revalidatePath('/admin/testimonials');
        return { success: true };
    } catch (e) {
        return { success: false };
    }
}
