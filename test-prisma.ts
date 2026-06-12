import { PrismaClient } from './src/generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const clients = await prisma.client.findMany();
    console.log(clients);
  } catch (e) {
    console.error(e);
  }
}
main();
