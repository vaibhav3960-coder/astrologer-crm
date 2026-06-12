"use client";

import Link from "next/link";
import { Plus } from "lucide-react";

export default function FloatingActionButton() {
  return (
    <Link 
      href="/consultations?new=true"
      style={{ 
        position: 'fixed', 
        bottom: '2rem', 
        right: '2rem', 
        width: '60px', 
        height: '60px', 
        borderRadius: '50%', 
        backgroundColor: 'var(--primary)', 
        color: 'var(--background)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        boxShadow: '0 4px 14px 0 rgba(245, 158, 11, 0.39)',
        zIndex: 40,
        transition: 'transform 0.2s'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <Plus size={32} />
    </Link>
  );
}
