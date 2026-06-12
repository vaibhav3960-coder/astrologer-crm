"use server";

import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { revalidatePath } from "next/cache";

const adapter = new PrismaBetterSqlite3({ url: 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

export async function createPayment(formData: FormData) {
  const clientId = formData.get("clientId") as string;
  const amount = parseFloat(formData.get("amount") as string);
  const service = formData.get("service") as string;
  const status = formData.get("status") as string;
  const date = formData.get("date") as string;

  await prisma.consultation.create({
    data: {
      clientId,
      date: date ? new Date(date) : new Date(),
      type: service || "Direct Payment",
      revenue: amount,
      paymentStatus: status || "PAID",
      status: "COMPLETED",
    }
  });

  revalidatePath("/payments");
  revalidatePath("/");
}

export async function markPaymentPaid(id: string) {
  await prisma.consultation.update({
    where: { id },
    data: { paymentStatus: 'PAID' },
  });
  revalidatePath("/payments");
  revalidatePath("/");
}
