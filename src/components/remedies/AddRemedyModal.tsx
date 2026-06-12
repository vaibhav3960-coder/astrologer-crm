"use client";

import { useState } from "react";
import { createRemedy } from "@/app/actions/remedies";
import { X } from "lucide-react";

export default function AddRemedyModal({ clients }: { clients: any[] }) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    await createRemedy(formData);
    setIsOpen(false);
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="btn-primary">
        + Assign Remedy
      </button>

      {isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '1rem' }}>
          <div className="glass" style={{ padding: '2rem', width: '100%', maxWidth: '500px', position: 'relative' }}>
            <button onClick={() => setIsOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--foreground)', cursor: 'pointer' }}><X size={24} /></button>
            <h2 style={{ marginTop: 0, color: 'var(--primary-light)' }}>Assign New Remedy</h2>
            
            <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Client *</label>
                <select name="clientId" required className="input" style={{ width: '100%' }}>
                  <option value="">Select a client</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id} style={{ color: 'black' }}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Remedy Type *</label>
                <select name="type" required className="input" style={{ width: '100%' }}>
                  <option value="Gemstone" style={{ color: 'black' }}>Gemstone</option>
                  <option value="Mantra" style={{ color: 'black' }}>Mantra Chanting</option>
                  <option value="Puja" style={{ color: 'black' }}>Puja / Ritual</option>
                  <option value="Fasting" style={{ color: 'black' }}>Fasting</option>
                  <option value="Other" style={{ color: 'black' }}>Other</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Remedy Description *</label>
                <input type="text" name="name" required placeholder="e.g. Wear Yellow Sapphire on Thursday" className="input" style={{ width: '100%' }} />
              </div>
              
              <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Assign Remedy</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
