"use server";

import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { revalidatePath } from "next/cache";

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

export async function createConsultation(formData: FormData) {
  const clientId = formData.get("clientId") as string;
  const date = formData.get("date") as string;
  const type = formData.get("type") as string;
  const notes = formData.get("notes") as string;

  await prisma.consultation.create({
    data: {
      clientId,
      date: new Date(date),
      type,
      notes,
    },
  });

  revalidatePath("/consultations");
}
