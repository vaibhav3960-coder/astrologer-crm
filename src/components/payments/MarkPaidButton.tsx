"use client";

import { markPaymentPaid } from "@/app/actions/payments";
import { Check } from "lucide-react";
import { useState } from "react";

export default function MarkPaidButton({ id, paymentStatus }: { id: string, paymentStatus: string }) {
  const [loading, setLoading] = useState(false);

  if (paymentStatus === 'PAID') return null;

  return (
    <button 
      onClick={async () => {
        setLoading(true);
        await markPaymentPaid(id);
        setLoading(false);
      }}
      disabled={loading}
      style={{ 
        background: 'rgba(34, 197, 94, 0.1)', 
        color: '#4ade80', 
        border: '1px solid #4ade80', 
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        fontSize: '0.75rem',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.5 : 1,
        marginRight: '0.5rem'
      }}
    >
      <Check size={14} />
      {loading ? 'Updating...' : 'Mark Paid'}
    </button>
  );
}
