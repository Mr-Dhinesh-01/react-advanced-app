// src/components/tabs/tabsContext.ts
import { createContext, useContext } from 'react';

export interface TabsContextValue {
  activeId: string;
  setActiveId: (id: string) => void;
}

export const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabs(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs.* must be used inside <Tabs>');
  return ctx;
}
