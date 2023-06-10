import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { Role, ROLE_NAME } from '../../src/core/users/constant/index';

const prisma = new PrismaClient();

async function initData() {
  await prisma.role.upsert({
    create: {
      id: +Role.MEMBER,
      name: ROLE_NAME.MEMBER,
      isActive: true,
    },
    where: {
      id: +Role.MEMBER,
    },
    update: {},
  });

  await prisma.role.upsert({
    create: {
      id: +Role.ADMIN,
      name: ROLE_NAME.ADMIN,
      isActive: true,
    },
    where: {
      id: +Role.ADMIN,
    },
    update: {},
  });

  await prisma.user.upsert({
    create: {
      firstName: 'admin',
      lastName: 'support',
      username: 'admin-support',
      email: 'admin@support.com',
      password: hashSync(process.env.PASSWORD_ADMIN, +process.env.SALT_ROUND),
      roleId: 2,
    },
    where: {
      email: 'admin@support.com',
    },
    update: {},
  });

  await prisma.category.upsert({
    create: {
      id: 1,
      name: 'Ao Dai',
    },
    where: {
      id: 1,
    },
    update: {},
  });
}

initData()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
