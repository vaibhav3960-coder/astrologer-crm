"use client";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from 'recharts';

const COLORS = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#84cc16', '#06b6d4', '#d946ef'];

export default function ReportsCharts({ zodiacData, servicesData, growthData }: {
  zodiacData: { name: string, value: number }[];
  servicesData: { name: string, revenue: number }[];
  growthData: { month: string, clients: number }[];
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
      <div className="glass" style={{ padding: '1.5rem', gridColumn: '1 / -1' }}>
        <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--primary-light)' }}>Client Growth (Last 6 Months)</h3>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--foreground)" opacity={0.6} tick={{ fill: 'var(--foreground)' }} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--foreground)" opacity={0.6} tick={{ fill: 'var(--foreground)' }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--primary)', borderRadius: '8px' }}
              />
              <Line type="monotone" dataKey="clients" stroke="var(--primary)" strokeWidth={3} dot={{ r: 6, fill: 'var(--primary)' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass" style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--primary-light)' }}>Zodiac Distribution</h3>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={zodiacData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                label={({ name, percent }: { name?: string, percent?: number }) => `${name || ''} ${((percent || 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {zodiacData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--primary)', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass" style={{ padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--primary-light)' }}>Top Services by Revenue</h3>
        <div style={{ height: '300px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={servicesData} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={true} vertical={false} />
              <XAxis type="number" stroke="var(--foreground)" opacity={0.6} tick={{ fill: 'var(--foreground)' }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" stroke="var(--foreground)" opacity={0.8} tick={{ fill: 'var(--foreground)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ backgroundColor: 'var(--background)', border: '1px solid var(--primary)', borderRadius: '8px' }}
                formatter={(value: any) => [`₹${(Number(value) || 0).toLocaleString('en-IN')}`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="var(--primary)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
