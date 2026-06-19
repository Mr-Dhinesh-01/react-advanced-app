// src/pages/AboutPage.tsx — a separate lazy chunk
export default function AboutPage() {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        padding: '20px',
      }}
    >
      <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>About</p>
      <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#475569' }}>
        This page is its own chunk — it only downloaded when you first opened it.
      </p>
    </div>
  );
}
