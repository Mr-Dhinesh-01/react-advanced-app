// src/components/tabs/Tabs.tsx
import { useState } from 'react';
import type { ReactNode } from 'react';
import { TabsContext, useTabs } from './tabsContext';

function Tabs({ defaultTab, children }: { defaultTab: string; children: ReactNode }) {
  const [activeId, setActiveId] = useState(defaultTab);
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden' }}>
      <TabsContext.Provider value={{ activeId, setActiveId }}>{children}</TabsContext.Provider>
    </div>
  );
}

function List({ children }: { children: ReactNode }) {
  return <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0' }}>{children}</div>;
}

function Tab({ id, children }: { id: string; children: ReactNode }) {
  const { activeId, setActiveId } = useTabs();
  const isActive = activeId === id;
  return (
    <button onClick={() => setActiveId(id)} style={{
      flex: 1, padding: '12px', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
      border: 'none', background: 'transparent',
      color: isActive ? '#0f172a' : '#94a3b8',
      borderBottom: isActive ? '2px solid #61dafb' : '2px solid transparent',
    }}>{children}</button>
  );
}

function Panel({ id, children }: { id: string; children: ReactNode }) {
  const { activeId } = useTabs();
  if (activeId !== id) return null;
  return <div style={{ padding: '16px' }}>{children}</div>;
}

// attach the parts → the compound dot-syntax API
Tabs.List = List;
Tabs.Tab = Tab;
Tabs.Panel = Panel;

export default Tabs;