"use client";

import { completeRemedy } from "@/app/actions/remedies";
import { Check } from "lucide-react";

export default function RemedyCompleteButton({ id }: { id: string }) {
  return (
    <button 
      onClick={() => completeRemedy(id)}
      style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--foreground)', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem' }}
    >
      <Check size={14} /> Mark Done
    </button>
  );
}
