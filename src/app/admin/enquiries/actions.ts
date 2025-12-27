'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { sendUserVisitUpdate } from "@/lib/mail";

export async function deleteEnquiry(id: string) {
    try {
        await prisma.enquiry.delete({
            where: { id }
        });
        revalidatePath('/admin/enquiries');
        revalidatePath('/admin/farm-visits');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (e) {
        return { success: false };
    }
}

export async function approveEnquiry(id: string) {
    try {
        const enquiry = await prisma.enquiry.update({
            where: { id },
            data: { status: 'approved' }
        });

        await sendUserVisitUpdate('APPROVED', enquiry);

        revalidatePath('/admin/enquiries');
        revalidatePath('/admin/farm-visits');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (e) {
        console.error("Approve error:", e);
        return { success: false };
    }
}

export async function rejectEnquiry(id: string, reason: string) {
    try {
        const enquiry = await prisma.enquiry.update({
            where: { id },
            data: {
                status: 'rejected',
                rejectionReason: reason
            }
        });

        await sendUserVisitUpdate('REJECTED', enquiry, reason);

        revalidatePath('/admin/enquiries');
        revalidatePath('/admin/farm-visits');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (e) {
        console.error("Reject error:", e);
        return { success: false };
    }
}

export async function replyEnquiryAction(id: string, message: string) {
    try {
        const enquiry = await prisma.enquiry.findUnique({ where: { id } });
        if (!enquiry) return { success: false, error: "Enquiry not found" };

        const { sendDirectReply } = await import("@/lib/mail");
        const mailResult = await sendDirectReply(enquiry.email, enquiry.name, "", message);

        if (mailResult.success) {
            await prisma.enquiry.update({
                where: { id },
                data: { isContacted: true }
            });
            revalidatePath('/admin/enquiries');
            revalidatePath('/admin/farm-visits');
            revalidatePath('/admin/dashboard');
            return { success: true };
        }
        return { success: false, error: "Failed to send email" };
    } catch (e) {
        console.error("Reply action error:", e);
        return { success: false, error: "Something went wrong" };
    }
}

export async function markAsContacted(id: string) {
    try {
        await prisma.enquiry.update({
            where: { id },
            data: { isContacted: true }
        });
        revalidatePath('/admin/enquiries');
        revalidatePath('/admin/farm-visits');
        revalidatePath('/admin/dashboard');
        return { success: true };
    } catch (e) {
        return { success: false };
    }
}
