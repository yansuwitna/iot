import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding development database...');

  // Create an organization
  const org = await prisma.organization.create({
    data: {
      name: 'Default Organization',
      slug: 'default-org',
      BrandingSetting: {
        create: {
          applicationName: 'Smart School IoT'
        }
      }
    }
  });
  console.log('Created Organization:', org.id);

  // Create a user
  const user = await prisma.user.create({
    data: {
      email: 'admin',
      passwordHash: await bcrypt.hash('Admin!', 10),
      firstName: 'Admin',
      lastName: 'User',
      organizationId: org.id,
      role: Role.SUPER_ADMIN
    }
  });
  console.log('Created Admin User:', user.id);

  console.log('Seeding Phase 3: Boards, Components, Templates...');

  await prisma.board.createMany({
    data: [
      { name: 'ESP32 DevKit V1', manufacturer: 'Espressif', architecture: 'Xtensa', chip: 'ESP32', supportedFrameworks: 'Arduino, ESP-IDF', voltage: 3.3 },
      { name: 'Arduino Uno R3', manufacturer: 'Arduino', architecture: 'AVR', chip: 'ATmega328P', supportedFrameworks: 'Arduino', voltage: 5.0 }
    ]
  });
  console.log('Created Boards');

  await prisma.component.createMany({
    data: [
      { name: 'LED', category: 'Actuator', description: 'Light Emitting Diode', pinRequirement: 'Digital', inputType: 'None', outputType: 'Digital' },
      { name: 'DHT22', category: 'Sensor', description: 'Temperature and Humidity Sensor', pinRequirement: 'Digital', inputType: 'Digital', outputType: 'None' },
      { name: 'Soil Moisture', category: 'Sensor', description: 'Analog Soil Moisture Sensor', pinRequirement: 'Analog', inputType: 'Analog', outputType: 'None' }
    ]
  });
  console.log('Created Components');

  await prisma.projectTemplate.createMany({
    data: [
      { name: 'Smart Garden', slug: 'smart-garden', category: 'SMART_GARDEN', description: 'A basic smart garden project measuring soil moisture and temperature.', difficulty: 'Beginner' },
      { name: 'Smart Home', slug: 'smart-home', category: 'SMART_HOME', description: 'A basic smart home project to control lights based on motion.', difficulty: 'Intermediate' }
    ]
  });
  console.log('Created Project Templates');

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
