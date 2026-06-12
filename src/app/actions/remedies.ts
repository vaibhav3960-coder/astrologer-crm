"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createRemedy(formData: FormData) {
  const clientId = formData.get("clientId") as string;
  const type = formData.get("type") as string;
  const name = formData.get("name") as string;
  
  await prisma.remedy.create({
    data: {
      clientId,
      type,
      name,
      status: 'ACTIVE',
    }
  });

  revalidatePath("/remedies");
  revalidatePath(`/clients/${clientId}`);
}

export async function completeRemedy(id: string) {
  const remedy = await prisma.remedy.update({
    where: { id },
    data: { status: 'COMPLETED' }
  });
  
  revalidatePath("/remedies");
  revalidatePath(`/clients/${remedy.clientId}`);
}
