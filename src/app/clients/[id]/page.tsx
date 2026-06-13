import { getClient } from "@/app/actions/clients";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sun, Moon, ArrowUpRight } from "lucide-react";
import BirthChart from "@/components/clients/BirthChart";
import PrintButton from "@/components/clients/PrintButton";
import styles from "./page.module.css";



export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ClientProfile({ params }: Props) {
  const resolvedParams = await params;
  const client = await getClient(resolvedParams.id);

  if (!client) {
    notFound();
  }

  return (
    <div>
      <Link href="/clients" className={styles.backLink}>
        <ArrowLeft size={16} /> Back to Clients
      </Link>
      
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{client.name}</h1>
          <div className={styles.badges}>
            {client.sunSign && (
              <span className={styles.badge}><Sun size={14} /> Sun: {client.sunSign}</span>
            )}
            {client.moonSign && (
              <span className={styles.badge}><Moon size={14} /> Moon: {client.moonSign}</span>
            )}
            {client.risingSign && (
              <span className={styles.badge}><ArrowUpRight size={14} /> Rising: {client.risingSign}</span>
            )}
            {client.zodiacSign && (
              <span className={styles.badge}>Zodiac: {client.zodiacSign}</span>
            )}
          </div>
        </div>
        <PrintButton />
      </div>

      <div className={styles.contentGrid}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className={`glass ${styles.card}`}>
            <h2>Astrological Details</h2>
            <div className={styles.detailRow}>
              <span className={styles.label}>Date of Birth</span>
              <span className={styles.value}>
                {client.dob ? new Date(client.dob).toLocaleDateString() : 'Not provided'}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Time of Birth</span>
              <span className={styles.value}>{client.tob || 'Not provided'}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Place of Birth</span>
              <span className={styles.value}>{client.pob || 'Not provided'}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.label}>Contact</span>
              <span className={styles.value}>
                {client.email || ''} {client.phone ? `| ${client.phone}` : ''}
              </span>
            </div>
          </div>

          <div className={`glass ${styles.card}`}>
            <h2>Active Remedies</h2>
            {client.remedies.length === 0 ? (
              <p className={styles.noData}>No remedies assigned to this client.</p>
            ) : (
              <div>
                {client.remedies.map(r => (
                  <div key={r.id} className={styles.remedyItem}>
                    <div>
                      <div style={{ fontWeight: 'bold', color: 'var(--primary-light)' }}>{r.name}</div>
                      <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>Type: {r.type}</div>
                    </div>
                    <span style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '4px', background: r.status === 'ACTIVE' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(100, 116, 139, 0.3)', color: r.status === 'ACTIVE' ? '#4ade80' : 'white' }}>
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className={`glass ${styles.card}`}>
            <h2>Consultation History</h2>
            {client.consultations.length === 0 ? (
              <p className={styles.noData}>No past consultations recorded.</p>
            ) : (
              <div className={styles.timeline}>
                {client.consultations.map((c) => (
                  <div key={c.id} className={styles.timelineItem}>
                    <div className={styles.timelineDot}></div>
                    <div className={styles.timelineContent}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h4>{c.type}</h4>
                        <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{c.status}</span>
                      </div>
                      <p>{new Date(c.date).toLocaleString()}</p>
                      {c.notes && (
                        <div className={styles.notes}>
                          <strong>Notes: </strong>{c.notes}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Chart */}
        <div>
          <div style={{ position: 'sticky', top: '2rem' }}>
            <BirthChart clientName={client.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
