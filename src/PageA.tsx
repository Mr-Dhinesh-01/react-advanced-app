// src/PageA.tsx — new file
export default function PageA() {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', marginTop: '12px' }}>
      <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Page A</p>
      <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#475569' }}>Loaded as its own chunk the first time you opened it.</p>
    </div>
  );
}