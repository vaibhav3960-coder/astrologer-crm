"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay } from "date-fns";
import styles from "./ConsultationsView.module.css";
import CompleteConsultationButton from "./CompleteConsultationButton";

export default function ConsultationsView({ consultations }: { consultations: any[] }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const selectedConsultations = consultations.filter(c => isSameDay(new Date(c.date), selectedDate));

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'COMPLETED': return '#4ade80';
      case 'CANCELLED': return '#ef4444';
      default: return '#fbbf24';
    }
  };

  return (
    <div className={styles.grid}>
      <div className={`glass ${styles.calendarWrapper}`}>
        <Calendar 
          onChange={(val) => setSelectedDate(val as Date)} 
          value={selectedDate} 
          className={styles.calendar}
          tileClassName={({ date }) => {
            if (consultations.some(c => isSameDay(new Date(c.date), date))) {
              return styles.hasConsultation;
            }
            return null;
          }}
        />
      </div>

      <div className={styles.listWrapper}>
        <h2 style={{ marginTop: 0, color: 'var(--primary-light)' }}>
          Consultations on {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </h2>

        {selectedConsultations.length === 0 ? (
          <div style={{ textAlign: 'center', opacity: 0.6, padding: '3rem 0' }}>
            No consultations scheduled for this date.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {selectedConsultations.map(c => (
              <div key={c.id} className="glass" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                      {new Date(c.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{c.type}</div>
                      <div style={{ opacity: 0.8 }}>with {c.client.name}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <CompleteConsultationButton id={c.id} currentStatus={c.status} />
                    <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem', borderRadius: '999px', background: `rgba(255,255,255,0.1)`, color: getStatusColor(c.status), border: `1px solid ${getStatusColor(c.status)}` }}>
                      {c.status}
                    </span>
                  </div>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '8px' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.25rem' }}>Notes:</strong>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{c.notes || 'None'}</p>
                  </div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.25rem' }}>Remedy Given:</strong>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{c.remedyGiven || 'None'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
