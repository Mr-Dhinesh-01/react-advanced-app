// src/HeavyPanel.tsx — a component we will load lazily
export default function HeavyPanel() {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', marginTop: '12px' }}>
      <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Heavy panel loaded</p>
      <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#475569' }}>
        This component lived in its own file and only downloaded when you
        opened it. The main bundle stayed small.
      </p>
    </div>
  );
}