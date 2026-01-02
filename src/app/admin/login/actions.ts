'use server';

import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";

export async function loginAction(email: string, pass: string) {
    try {
        const envEmail = process.env.ADMIN_EMAIL;
        const envPass = process.env.ADMIN_PASSWORD;

        if (!envEmail || !envPass) {
            console.error("Missing ADMIN_EMAIL or ADMIN_PASSWORD in environment variables");
            return { error: "Authentication configuration error" };
        }

        // Sync admin from environment variables
        const existingAdmin = await prisma.admin.findUnique({
            where: { email: envEmail }
        });

        if (!existingAdmin) {
            // If the admin from .env doesn't exist, create it
            const hashedPassword = await bcrypt.hash(envPass, 10);
            await prisma.admin.create({
                data: {
                    email: envEmail,
                    passwordHash: hashedPassword
                }
            });

            // Cleanup old default admin if it was changed
            const oldEmails = ["admin@exoticafarms.com", "admin@exoticafarm.com"];
            for (const oldEmail of oldEmails) {
                if (envEmail !== oldEmail) {
                    try {
                        await prisma.admin.delete({
                            where: { email: oldEmail }
                        });
                    } catch (e) {
                        // Ignore if it doesn't exist
                    }
                }
            }
        } else {
            // If it exists, ensure the password matches the .env (in case it was changed)
            const isPasswordMatch = await bcrypt.compare(envPass, existingAdmin.passwordHash);
            if (!isPasswordMatch) {
                const hashedPassword = await bcrypt.hash(envPass, 10);
                await prisma.admin.update({
                    where: { email: envEmail },
                    data: { passwordHash: hashedPassword }
                });
            }
        }

        // Now perform the actual login check against the database
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
