import { Users, Calendar, Sparkles, IndianRupee, Star, ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";
import DashboardChart from "@/components/dashboard/DashboardChart";

export default async function Home() {
  // Fetch Data
  const clientsCount = await prisma.client.count();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);
  
  const todayReadingsCount = await prisma.consultation.count({
    where: { date: { gte: todayStart, lte: todayEnd } }
  });

  const activeRemediesCount = await prisma.remedy.count({
    where: { status: 'ACTIVE' }
  });

  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);
  
  const revenueAggr = await prisma.consultation.aggregate({
    _sum: { revenue: true },
    where: { date: { gte: currentMonthStart }, paymentStatus: 'PAID' }
  });
  const revenue = revenueAggr._sum.revenue || 0;

  const upcomingConsultations = await prisma.consultation.findMany({
    where: { date: { gte: new Date() } },
    orderBy: { date: 'asc' },
    take: 5,
    include: { client: true }
  });

  const recentClients = await prisma.client.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5
  });

  const getZodiacEmoji = (sign: string | null) => {
    switch (sign?.toLowerCase()) {
      case 'aries': return '♈';
      case 'taurus': return '♉';
      case 'gemini': return '♊';
      case 'cancer': return '♋';
      case 'leo': return '♌';
      case 'virgo': return '♍';
      case 'libra': return '♎';
      case 'scorpio': return '♏';
      case 'sagittarius': return '♐';
      case 'capricorn': return '♑';
      case 'aquarius': return '♒';
      case 'pisces': return '♓';
      default: return '👤';
    }
  };

  return (
    <div className={styles.dashboard}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.greeting}>{todayStart.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          <h1 className={styles.title}>Your Cosmic Overview</h1>
          <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(245, 158, 11, 0.1)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.2)', color: 'var(--primary-light)', fontSize: '0.9rem' }}>
            <Star size={16} />
            <span><strong>Tip:</strong> Mercury is in retrograde — double check client birth times! 🪐</span>
          </div>
        </div>
        <Link href="/consultations?new=true" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <Star size={18} />
          New Consultation
        </Link>
      </section>

      <section className={styles.statsGrid}>
        <div className={`glass ${styles.statCard}`}>
          <div className={styles.statIcon}><Users size={24} /></div>
          <div className={styles.statInfo}>
            <h3>Total Clients</h3>
            <p>{clientsCount}</p>
          </div>
        </div>
        <div className={`glass ${styles.statCard}`}>
          <div className={styles.statIcon}><Calendar size={24} /></div>
          <div className={styles.statInfo}>
            <h3>Today's Readings</h3>
            <p>{todayReadingsCount}</p>
          </div>
        </div>
        <div className={`glass ${styles.statCard}`}>
          <div className={styles.statIcon}><Star size={24} /></div>
          <div className={styles.statInfo}>
            <h3>Active Remedies</h3>
            <p>{activeRemediesCount}</p>
          </div>
        </div>
        <div className={`glass ${styles.statCard}`}>
          <div className={styles.statIcon}><IndianRupee size={24} /></div>
          <div className={styles.statInfo}>
            <h3>Revenue This Month</h3>
            <p>₹{revenue.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </section>

      <section className={styles.mainGrid}>
        <DashboardChart />
        
        <div className="glass" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, color: 'var(--primary-light)' }}>Upcoming Today</h3>
            <Link href="/consultations" style={{ color: 'var(--foreground)', opacity: 0.7, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem' }}>
              View all <ArrowRight size={14} />
            </Link>
          </div>
          
          {upcomingConsultations.length === 0 ? (
            <p style={{ opacity: 0.7, textAlign: 'center', padding: '2rem 0' }}>No upcoming readings.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {upcomingConsultations.map(c => (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', minWidth: '60px' }}>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{new Date(c.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</div>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--primary)' }}>{new Date(c.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{c.client.name}</div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>{c.type}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className={styles.bottomGrid}>
        <div className="glass" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, color: 'var(--primary-light)' }}>Recent Clients</h3>
            <Link href="/clients" style={{ color: 'var(--foreground)', opacity: 0.7, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9rem' }}>
              View all <ArrowRight size={14} />
            </Link>
          </div>
          
          {recentClients.length === 0 ? (
            <p style={{ opacity: 0.7, textAlign: 'center', padding: '2rem 0' }}>No clients yet.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
                  <th style={{ padding: '0.75rem', opacity: 0.7, fontWeight: 'normal', fontSize: '0.9rem' }}>Name</th>
                  <th style={{ padding: '0.75rem', opacity: 0.7, fontWeight: 'normal', fontSize: '0.9rem' }}>Email</th>
                  <th style={{ padding: '0.75rem', opacity: 0.7, fontWeight: 'normal', fontSize: '0.9rem' }}>Joined</th>
                </tr>
              </thead>
              <tbody>
                {recentClients.map(client => (
                  <tr key={client.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem 0.75rem' }}>
                      <Link href={`/clients/${client.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--foreground)', textDecoration: 'none', fontWeight: '500' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>
                          {getZodiacEmoji(client.zodiacSign)}
                        </div>
                        {client.name}
                      </Link>
                    </td>
                    <td style={{ padding: '1rem 0.75rem', opacity: 0.8 }}>{client.email || '-'}</td>
                    <td style={{ padding: '1rem 0.75rem', opacity: 0.8 }}>{client.createdAt.toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
