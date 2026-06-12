"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const mockData = [
  { name: 'Mon', consultations: 4 },
  { name: 'Tue', consultations: 7 },
  { name: 'Wed', consultations: 5 },
  { name: 'Thu', consultations: 8 },
  { name: 'Fri', consultations: 12 },
  { name: 'Sat', consultations: 15 },
  { name: 'Sun', consultations: 10 },
];

export default function DashboardChart() {
  return (
    <div className="glass" style={{ padding: '1.5rem', height: '100%' }}>
      <h3 style={{ marginTop: 0, marginBottom: '1.5rem', color: 'var(--primary-light)' }}>Weekly Consultations</h3>
      <div style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis dataKey="name" stroke="var(--foreground)" opacity={0.6} tick={{ fill: 'var(--foreground)' }} axisLine={false} tickLine={false} />
            <YAxis stroke="var(--foreground)" opacity={0.6} tick={{ fill: 'var(--foreground)' }} axisLine={false} tickLine={false} />
            <Tooltip 
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--primary)', borderRadius: '8px' }}
            />
            <Bar dataKey="consultations" fill="var(--primary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
