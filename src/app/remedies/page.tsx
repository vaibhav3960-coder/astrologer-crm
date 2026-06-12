import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AddRemedyModal from "@/components/remedies/AddRemedyModal";
import RemediesFilterableList from "@/components/remedies/RemediesFilterableList";

export default async function RemediesPage() {
  const remedies = await prisma.remedy.findMany({
    include: { client: true },
    orderBy: { assignedAt: 'desc' },
  });
  const clients = await prisma.client.findMany({ orderBy: { name: 'asc' } });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Remedies Tracking</h1>
          <p style={{ opacity: 0.7, margin: '0.5rem 0 0 0' }}>Track prescribed gems, mantras, and rituals.</p>
        </div>
        <AddRemedyModal clients={clients} />
      </div>

      <RemediesFilterableList remedies={remedies} />
    </div>
  );
}
