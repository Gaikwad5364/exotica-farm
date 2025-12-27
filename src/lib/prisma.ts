import { PrismaClient } from '@prisma/client';

if (!process.env.DATABASE_URL) {
    console.error("CRITICAL: DATABASE_URL is missing from environment variables!");
} else if (!process.env.DATABASE_URL.startsWith("postgresql://") && !process.env.DATABASE_URL.startsWith("postgres://")) {
    console.error("CRITICAL: DATABASE_URL does not start with the correct protocol!");
    console.error("It starts with:", process.env.DATABASE_URL.substring(0, 5) + "...");
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
