export default function SettingsPage() {
  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Settings</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div className="glass" style={{ padding: '2rem' }}>
          <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--primary-light)' }}>Profile Settings</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary-light)' }}>Astrologer Name</label>
              <input type="text" defaultValue="Mystic Seer" className="input" style={{ width: '100%', maxWidth: '400px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--primary-light)' }}>Email Address</label>
              <input type="email" defaultValue="seer@astrocrm.com" className="input" style={{ width: '100%', maxWidth: '400px' }} />
            </div>
            <div>
              <button className="btn-primary" style={{ marginTop: '1rem' }}>Save Changes</button>
            </div>
          </div>
        </div>

        <div className="glass" style={{ padding: '2rem' }}>
          <h2 style={{ marginTop: 0, marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--primary-light)' }}>Preferences</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input type="checkbox" id="dark-mode" defaultChecked />
              <label htmlFor="dark-mode">Enable Mystic Dark Mode</label>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input type="checkbox" id="notifications" defaultChecked />
              <label htmlFor="notifications">Email Notifications for New Consultations</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
