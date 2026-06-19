// src/features/tasks/SearchBar.tsx — props in, events out
export function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <input
      value={value}
      placeholder="Search tasks"
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        background: '#f8fafc',
        fontSize: '14px',
      }}
    />
  );
}
