import { IndianRupee, Download, ArrowUpRight, Clock } from "lucide-react";
import AddPaymentModal from "@/components/payments/AddPaymentModal";
import MarkPaidButton from "@/components/payments/MarkPaidButton";
import { prisma } from "@/lib/prisma";
import { Suspense } from "react";

export default async function PaymentsPage() {
  const clients = await prisma.client.findMany({ orderBy: { name: 'asc' } });
  const consultations = await prisma.consultation.findMany({
    where: { revenue: { gt: 0 } },
    include: { client: true },
    orderBy: { date: 'desc' },
  });

  const totalRevenue = consultations.filter(c => c.paymentStatus === 'PAID').reduce((acc, curr) => acc + (curr.revenue || 0), 0);
  
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonthRevenue = consultations.filter(c => c.paymentStatus === 'PAID' && new Date(c.date).getMonth() === currentMonth && new Date(c.date).getFullYear() === currentYear).reduce((acc, curr) => acc + (curr.revenue || 0), 0);

  const pendingRevenue = consultations.filter(c => c.paymentStatus === 'UNPAID').reduce((acc, curr) => acc + (curr.revenue || 0), 0);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Payments & Revenue</h1>
          <p style={{ opacity: 0.7, margin: '0.5rem 0 0 0' }}>Manage your financial transactions and consultation fees.</p>
        </div>
        <button className="btn-primary">
          <Download size={18} style={{ marginRight: '0.5rem' }} />
          Export Invoice
        </button>
      </div>

      <Suspense fallback={null}>
        <AddPaymentModal clients={clients} />
      </Suspense>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--primary)', padding: '1rem', borderRadius: '50%' }}>
            <IndianRupee size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem', textTransform: 'uppercase' }}>Total Revenue</h3>
            <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--primary-light)' }}>₹{totalRevenue.toLocaleString('en-IN')}</p>
          </div>
        </div>
        <div className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', padding: '1rem', borderRadius: '50%' }}>
            <ArrowUpRight size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem', textTransform: 'uppercase' }}>This Month</h3>
            <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold' }}>₹{thisMonthRevenue.toLocaleString('en-IN')}</p>
          </div>
        </div>
        <div className="glass" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '50%' }}>
            <Clock size={24} />
          </div>
          <div>
            <h3 style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem', textTransform: 'uppercase' }}>Pending Payments</h3>
            <p style={{ margin: 0, fontSize: '1.8rem', fontWeight: 'bold', color: '#ef4444' }}>₹{pendingRevenue.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      <div className="glass" style={{ padding: '1.5rem' }}>
        <h2 style={{ color: 'var(--primary-light)', marginTop: 0, marginBottom: '1.5rem' }}>Transaction History</h2>
        {consultations.length === 0 ? (
          <p style={{ opacity: 0.6, textAlign: 'center', padding: '2rem' }}>No payment records found. Add revenue to your consultations.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                <th style={{ padding: '1rem', opacity: 0.7, fontWeight: '500' }}>Date</th>
                <th style={{ padding: '1rem', opacity: 0.7, fontWeight: '500' }}>Client</th>
                <th style={{ padding: '1rem', opacity: 0.7, fontWeight: '500' }}>Service</th>
                <th style={{ padding: '1rem', opacity: 0.7, fontWeight: '500' }}>Amount</th>
                <th style={{ padding: '1rem', opacity: 0.7, fontWeight: '500' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem' }}>{new Date(c.date).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{c.client.name}</td>
                  <td style={{ padding: '1rem', opacity: 0.8 }}>{c.type}</td>
                  <td style={{ padding: '1rem', color: 'var(--primary-light)', fontWeight: 'bold' }}>₹{c.revenue?.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '1rem', display: 'flex', alignItems: 'center' }}>
                    <MarkPaidButton id={c.id} paymentStatus={c.paymentStatus} />
                    {c.paymentStatus === 'PAID' ? (
                      <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', borderRadius: '4px' }}>Paid</span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '4px' }}>Unpaid</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
