"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createPayment } from "@/app/actions/payments";
import { X } from "lucide-react";

export default function AddPaymentModal({ clients }: { clients: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNew = searchParams.get("new") === "true";
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isNew) setIsOpen(true);
  }, [isNew]);

  if (!isOpen) return null;

  const close = () => {
    setIsOpen(false);
    router.push("/payments");
  };

  async function handleSubmit(formData: FormData) {
    await createPayment(formData);
    close();
  }

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1rem' }}>
      <div className="glass" style={{ padding: '2rem', width: '100%', maxWidth: '500px', position: 'relative' }}>
        <button onClick={close} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--foreground)', cursor: 'pointer' }}><X size={24} /></button>
        <h2 style={{ marginTop: 0, color: 'var(--primary-light)' }}>Record Payment</h2>
        
        <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Select Client</label>
            <select name="clientId" required className="input" style={{ width: '100%' }}>
              <option value="">-- Select Client --</option>
              {clients.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Amount (₹)</label>
            <input type="number" name="amount" required className="input" style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Service/Reason</label>
            <input type="text" name="service" required className="input" style={{ width: '100%' }} placeholder="e.g. Gemstone Purchase" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Payment Status</label>
            <select name="status" required className="input" style={{ width: '100%' }}>
              <option value="PAID">Paid</option>
              <option value="UNPAID">Unpaid</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Date</label>
            <input type="datetime-local" name="date" required className="input" style={{ width: '100%' }} />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Record Payment</button>
        </form>
      </div>
    </div>
  );
}
