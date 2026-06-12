import { PrismaClient } from './src/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const clients = await prisma.client.findMany();
    console.log(clients);
  } catch (e) {
    console.error(e);
  }
}
main();
