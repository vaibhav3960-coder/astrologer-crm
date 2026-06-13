"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter } from "lucide-react";

export default function ClientsDataTable({ initialClients }: { initialClients: any[] }) {
  const [search, setSearch] = useState("");
  const [zodiacFilter, setZodiacFilter] = useState("");

  const filteredClients = initialClients.filter((client) => {
    const matchesSearch = client.name.toLowerCase().includes(search.toLowerCase()) || 
                          (client.email && client.email.toLowerCase().includes(search.toLowerCase()));
    const matchesZodiac = zodiacFilter ? client.zodiacSign === zodiacFilter : true;
    return matchesSearch && matchesZodiac;
  });

  const uniqueZodiacs = Array.from(new Set(initialClients.map(c => c.zodiacSign).filter(Boolean)));

  return (
    <div className="glass" style={{ padding: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.6 }} />
          <input 
            type="text" 
            placeholder="Search clients by name or email..." 
            className="input"
            style={{ width: '100%', paddingLeft: '2.5rem' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Filter size={18} style={{ opacity: 0.6 }} />
          <select 
            style={{ background: 'transparent', border: 'none', color: 'var(--foreground)', outline: 'none', padding: '0.75rem 0' }}
            value={zodiacFilter}
            onChange={(e) => setZodiacFilter(e.target.value)}
          >
            <option value="" style={{ color: 'black' }}>All Zodiac Signs</option>
            {uniqueZodiacs.map(z => (
              <option key={z as string} value={z as string} style={{ color: 'black' }}>{z as string}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', textAlign: 'left' }}>
              <th style={{ padding: '1rem', opacity: 0.7, fontWeight: '500' }}>Name</th>
              <th style={{ padding: '1rem', opacity: 0.7, fontWeight: '500' }}>Contact Info</th>
              <th style={{ padding: '1rem', opacity: 0.7, fontWeight: '500' }}>Birth Details</th>
              <th style={{ padding: '1rem', opacity: 0.7, fontWeight: '500' }}>Zodiac Sign</th>
              <th style={{ padding: '1rem', opacity: 0.7, fontWeight: '500' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients.map((client) => (
              <tr key={client.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background-color 0.2s' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: '600', color: 'var(--primary-light)' }}>{client.name}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Joined {new Date(client.createdAt).toISOString().split('T')[0]}</div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.9rem' }}>{client.email || '-'}</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>{client.phone || '-'}</div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontSize: '0.9rem' }}>{client.dob ? new Date(client.dob).toISOString().split('T')[0] : '-'} {client.tob ? `at ${client.tob}` : ''}</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>{client.pob || '-'}</div>
                </td>
                <td style={{ padding: '1rem' }}>
                  {client.zodiacSign ? (
                    <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--primary)', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '500' }}>
                      {client.zodiacSign}
                    </span>
                  ) : '-'}
                </td>
                <td style={{ padding: '1rem' }}>
                  <Link href={`/clients/${client.id}`} className="btn-secondary" style={{ textDecoration: 'none', fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
                    View Profile
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredClients.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', opacity: 0.6 }}>
            No clients found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
