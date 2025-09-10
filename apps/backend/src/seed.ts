import bcrypt from 'bcryptjs';
import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

async function cleanDatabase() {
  console.log('🧹 Cleaning database...');

  await prisma.audio.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('✅ Database cleaned');
}

async function seedDatabase() {
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

  const podcastCategory = await prisma.category.upsert({
    where: { name: 'Podcast' },
    update: {},
    create: {
      name: 'Podcast',
      description: 'Podcast episodes',
    },
  });
  console.log(`Created Podcast category: ${podcastCategory.name}`);

  const soundEffectCategory = await prisma.category.upsert({
    where: { name: 'Sound Effects' },
    update: {},
    create: {
      name: 'Sound Effects',
      description: 'Various sound effects',
    },
  });
  console.log(`Created Sound Effects category: ${soundEffectCategory.name}`);

  const sampleAudios = [
    {
      title: 'Demo Music Track',
      description: 'A sample music track for demonstration',
      filename: 'demo-music.mp3',
      originalName: 'demo-music.mp3',
      filePath: '/uploads/audio/demo-music.mp3',
      mimeType: 'audio/mpeg',
      size: 1024000, // 1MB
      duration: 180, // 3 minutes
      isProcessing: false,
      userId: regularUser.id,
      categoryId: soundEffectCategory.id,
    },
    {
      title: 'Podcast Introduction',
      description: 'Introduction segment for a podcast',
      filename: 'podcast-intro.mp3',
      originalName: 'podcast-introduction.mp3',
      filePath: '/uploads/audio/podcast-intro.mp3',
      mimeType: 'audio/mpeg',
      size: 512000,
      duration: 60,
      isProcessing: false,
      userId: regularUser.id,
      categoryId: podcastCategory.id,
    },
    {
      title: 'Notification Sound',
      description: 'Simple notification sound effect',
      filename: 'notification.mp3',
      originalName: 'notification-sound.mp3',
      filePath: '/uploads/audio/notification.mp3',
      mimeType: 'audio/mpeg',
      size: 256000,
      duration: 5,
      isProcessing: false,
      userId: adminUser.id,
      categoryId: soundEffectCategory.id,
    },
    {
      title: 'Demo Music Track 1',
      description: 'A sample music track for demonstration 1',
      filename: 'demo-music-1.mp3',
      originalName: 'demo-music-1.mp3',
      filePath: '/uploads/audio/demo-music-1.mp3',
      mimeType: 'audio/mpeg',
      size: 1024000,
      duration: 180,
      isProcessing: false,
      userId: adminUser.id,
      categoryId: podcastCategory.id,
    },
  ];
  // Create audio entries
  for (const audioData of sampleAudios) {
    await prisma.audio.create({
      data: audioData,
    });

    console.log(`Created audio: ${audioData.filename} for ${audioData.userId}`);
  }
  console.log('Database seeding completed!');
}

async function main() {
  try {
    await cleanDatabase();
    await seedDatabase();
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
