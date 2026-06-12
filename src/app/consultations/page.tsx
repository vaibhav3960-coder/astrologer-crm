import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Suspense } from "react";
import NewConsultationModal from "@/components/consultations/NewConsultationModal";
import ConsultationsView from "@/components/consultations/ConsultationsView";

export default async function ConsultationsPage() {
  const consultations = await prisma.consultation.findMany({
    include: { client: true },
    orderBy: { date: 'asc' },
  });
  const clients = await prisma.client.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Consultations Calendar</h1>
          <p style={{ opacity: 0.7, margin: '0.5rem 0 0 0' }}>Manage your schedule and daily readings.</p>
        </div>
        <Link href="/consultations?new=true" className="btn-primary" style={{ textDecoration: 'none' }}>+ Schedule New</Link>
      </div>
      
      <Suspense fallback={null}>
        <NewConsultationModal clients={clients} />
      </Suspense>
      
      <ConsultationsView consultations={consultations} />
    </div>
  );
}
