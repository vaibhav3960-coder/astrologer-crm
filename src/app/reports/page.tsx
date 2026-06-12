import { Download } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ReportsCharts from "@/components/reports/ReportsCharts";

export default async function ReportsPage() {
  const clients = await prisma.client.findMany();
  const consultations = await prisma.consultation.findMany({ where: { revenue: { gt: 0 }, paymentStatus: 'PAID' } });

  // 1. Zodiac Distribution Data
  const zodiacCounts: Record<string, number> = {};
  clients.forEach(c => {
    if (c.zodiacSign) {
      zodiacCounts[c.zodiacSign] = (zodiacCounts[c.zodiacSign] || 0) + 1;
    }
  });
  const zodiacData = Object.keys(zodiacCounts).map(k => ({ name: k, value: zodiacCounts[k] })).sort((a, b) => b.value - a.value).slice(0, 6);

  // 2. Top Services Data
  const servicesCounts: Record<string, number> = {};
  consultations.forEach(c => {
    servicesCounts[c.type] = (servicesCounts[c.type] || 0) + (c.revenue || 0);
  });
  const servicesData = Object.keys(servicesCounts).map(k => ({ name: k, revenue: servicesCounts[k] })).sort((a, b) => b.revenue - a.revenue);

  // 3. Client Growth Data (Mocked last 6 months for visualization, but anchored to real client count)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  let base = clients.length > 20 ? clients.length - 20 : 0;
  const growthData = months.map((m, i) => {
    base += Math.floor(Math.random() * 5) + 1;
    return { month: m, clients: base };
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Reports & Analytics</h1>
          <p style={{ opacity: 0.7, margin: '0.5rem 0 0 0' }}>Insights into your practice's growth and services.</p>
        </div>
        <button className="btn-primary">
          <Download size={18} style={{ marginRight: '0.5rem' }} />
          Export Full Report
        </button>
      </div>

      <ReportsCharts zodiacData={zodiacData} servicesData={servicesData} growthData={growthData} />
    </div>
  );
}
