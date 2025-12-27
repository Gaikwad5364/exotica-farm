'use server';

import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function loginAction(email: string, pass: string) {
    try {
        // Ensure at least one admin exists (Using env vars for initial setup)
        const adminCount = await prisma.admin.count();
        if (adminCount === 0) {
            const defaultEmail = process.env.ADMIN_EMAIL || "admin@exoticafarm.com";
            const defaultPass = process.env.ADMIN_PASSWORD || "admin123";
            const hashedPassword = await bcrypt.hash(defaultPass, 10);

            await prisma.admin.create({
                data: {
                    email: defaultEmail,
                    passwordHash: hashedPassword
                }
            });
        }

        const admin = await prisma.admin.findUnique({
            where: { email }
        });

        if (!admin) {
            return { error: "Invalid credentials" };
        }

        const isPasswordCorrect = await bcrypt.compare(pass, admin.passwordHash);

        if (!isPasswordCorrect) {
            return { error: "Invalid credentials" };
        }

        // Create session
        const expires = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
        const session = await encrypt({ adminId: admin.id, expires });

        // Save session in cookie
        (await cookies()).set("session", session, {
            expires,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/"
        });

    } catch (e) {
        console.error("Login Error:", e);
        return { error: "An unexpected error occurred" };
    }

    redirect("/admin/dashboard");
}

export async function logoutAction() {
    (await cookies()).set("session", "", { expires: new Date(0), path: "/" });
    redirect("/admin/login");
}
