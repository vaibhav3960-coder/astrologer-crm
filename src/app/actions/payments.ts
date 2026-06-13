"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPayment(formData: FormData) {
  try {
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
  } catch {
    revalidatePath("/payments");
  }
}

export async function markPaymentPaid(id: string) {
  try {
    await prisma.consultation.update({
      where: { id },
      data: { paymentStatus: 'PAID' },
    });
    revalidatePath("/payments");
    revalidatePath("/");
  } catch {
    revalidatePath("/payments");
  }
}
