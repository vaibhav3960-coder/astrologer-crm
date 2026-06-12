"use client";

import { useState } from "react";
import Link from "next/link";
import RemedyCompleteButton from "@/components/remedies/RemedyCompleteButton";

export default function RemediesFilterableList({ remedies }: { remedies: any[] }) {
  const [filter, setFilter] = useState("All");

  const activeRemedies = remedies.filter(r => r.status === 'ACTIVE' && (filter === 'All' || r.type === filter));
  const completedRemedies = remedies.filter(r => r.status === 'COMPLETED');

  const tabs = ["All", "Gemstone", "Mantra", "Puja", "Fasting", "Ritual"];

  return (
    <>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setFilter(tab)}
            style={{ 
              background: filter === tab ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
              color: filter === tab ? 'var(--background)' : 'var(--foreground)',
              border: 'none',
              padding: '0.5rem 1.5rem',
              borderRadius: '999px',
              cursor: 'pointer',
              fontWeight: filter === tab ? 'bold' : 'normal',
              whiteSpace: 'nowrap'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <h2 style={{ color: 'var(--primary-light)', marginBottom: '1rem' }}>Active Prescriptions {filter !== 'All' && `(${filter})`}</h2>
      {activeRemedies.length === 0 ? (
        <div className="glass" style={{ padding: '2rem', textAlign: 'center', opacity: 0.6 }}>No active {filter !== 'All' ? filter : ''} remedies found.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {activeRemedies.map(r => (
            <div key={r.id} className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: 'rgba(245, 158, 11, 0.2)', color: 'var(--primary)', borderRadius: '999px', border: '1px solid rgba(245,158,11,0.3)' }}>{r.type}</span>
                <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>{new Date(r.assignedAt).toLocaleDateString()}</span>
              </div>
              <div>
                <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{r.name}</h3>
                <p style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem' }}>for <Link href={`/clients/${r.clientId}`} style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>{r.client.name}</Link></p>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <RemedyCompleteButton id={r.id} />
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 style={{ color: 'var(--primary-light)', marginBottom: '1rem' }}>Completed Remedies</h2>
      {completedRemedies.length === 0 ? (
        <div className="glass" style={{ padding: '2rem', textAlign: 'center', opacity: 0.6 }}>No completed remedies yet.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', opacity: 0.7 }}>
          {completedRemedies.map(r => (
            <div key={r.id} className="glass" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem' }}>{r.type}</span>
                <span style={{ fontSize: '0.8rem', color: '#4ade80' }}>✓ Completed</span>
              </div>
              <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{r.name}</h3>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>for {r.client.name}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
