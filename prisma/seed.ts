import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@exoticafarms.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    console.log('--- Starting Database Seed ---');

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
        where: { email: adminEmail },
    });

    if (!existingAdmin) {
        console.log(`No admin found with email: ${adminEmail}. Creating default admin...`);
        const hashedPassword = await bcrypt.hash(adminPassword, 10);

        await prisma.admin.create({
            data: {
                email: adminEmail,
                passwordHash: hashedPassword,
            },
        });
        console.log('✅ Admin user created successfully.');
    } else {
        console.log(`ℹ️ Admin user already exists with email: ${adminEmail}.`);
    }

    console.log('--- Seeding Completed ---');
}

main()
    .catch((e) => {
        console.error('❌ Error during database seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
