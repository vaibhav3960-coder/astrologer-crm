"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getClients() {
  return await prisma.client.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function createClient(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const dob = formData.get("dob") as string;
  const tob = formData.get("tob") as string;
  const pob = formData.get("pob") as string;
  const zodiacSign = formData.get("zodiacSign") as string;
  const sunSign = formData.get("sunSign") as string;
  const moonSign = formData.get("moonSign") as string;
  const risingSign = formData.get("risingSign") as string;

  await prisma.client.create({
    data: {
      name,
      email: email || null,
      phone: phone || null,
      dob: dob ? new Date(dob) : null,
      tob: tob || null,
      pob: pob || null,
      zodiacSign: zodiacSign || null,
      sunSign: sunSign || null,
      moonSign: moonSign || null,
      risingSign: risingSign || null,
    }
  });

  revalidatePath("/clients");
}

export async function getClient(id: string) {
  return await prisma.client.findUnique({
    where: { id },
    include: {
      consultations: {
        orderBy: { date: "desc" },
      },
      remedies: {
        orderBy: { assignedAt: "desc" },
      }
    },
  });
}
