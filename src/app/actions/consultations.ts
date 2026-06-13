"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createConsultation(formData: FormData) {
  try {
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
  } catch {
    revalidatePath("/consultations");
  }
}

export async function completeConsultation(id: string) {
  try {
    await prisma.consultation.update({
      where: { id },
      data: { status: 'COMPLETED' },
    });
    revalidatePath("/consultations");
  } catch {
    revalidatePath("/consultations");
  }
}
