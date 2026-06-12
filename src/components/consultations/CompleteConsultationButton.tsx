"use client";

import { completeConsultation } from "@/app/actions/consultations";
import { Check } from "lucide-react";
import { useState } from "react";

export default function CompleteConsultationButton({ id, currentStatus }: { id: string, currentStatus: string }) {
  const [loading, setLoading] = useState(false);

  if (currentStatus !== 'SCHEDULED') return null;

  return (
    <button 
      onClick={async () => {
        setLoading(true);
        await completeConsultation(id);
        setLoading(false);
      }}
      disabled={loading}
      style={{ 
        background: 'rgba(34, 197, 94, 0.1)', 
        color: '#4ade80', 
        border: '1px solid #4ade80', 
        padding: '0.25rem 0.5rem',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        fontSize: '0.75rem',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.5 : 1
      }}
    >
      <Check size={14} />
      {loading ? 'Completing...' : 'Mark Completed'}
    </button>
  );
}
