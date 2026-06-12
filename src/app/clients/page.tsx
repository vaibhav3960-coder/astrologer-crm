import { prisma } from "@/lib/prisma";
import AddClientModal from "@/components/clients/AddClientModal";
import ClientsDataTable from "@/components/clients/ClientsDataTable";


export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Client Management</h1>
          <p style={{ opacity: 0.7, margin: '0.5rem 0 0 0' }}>View, search, and filter your cosmic directory.</p>
        </div>
        <AddClientModal />
      </div>

      <ClientsDataTable initialClients={clients} />
    </div>
  );
}
