import bcrypt from 'bcryptjs';
import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  const adminPassword = await bcrypt.hash('admin123', 10);
  const sampleDate = new Date().toISOString();
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      fullName: 'Admin User',
      displayName: 'Admin',
      active: true,
      role: 'ADMIN',
      createdAt: sampleDate,
      updatedAt: sampleDate,
    },
  });
  console.log(`Created admin user: ${adminUser.email}`);

  const userPassword = await bcrypt.hash('user123', 10);
  const regularUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      password: userPassword,
      fullName: 'Regular User',
      displayName: 'User',
      role: 'USER',
      createdAt: sampleDate,
      updatedAt: sampleDate,
    },
  });
  console.log(`Created regular user: ${regularUser.email}`);

  console.log('Database seeding completed!');
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
