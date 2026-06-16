// src/components/fetch/Fetch.tsx — a generic render-prop fetcher
import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import axios from 'axios';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface FetchProps<T> {
  url: string;
  children: (state: FetchState<T>) => ReactNode;
}

export function Fetch<T>({ url, children }: FetchProps<T>) {
  // start in the loading state — no synchronous setState in the effect
  const [state, setState] = useState<FetchState<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    // the request is the external system; we only setState in its callbacks
    axios.get<T>(url)
      .then((res) => { if (!cancelled) setState({ data: res.data, loading: false, error: null }); })
      .catch((err) => { if (!cancelled) setState({ data: null, loading: false, error: err.message ?? 'Failed' }); });
    return () => { cancelled = true; };
  }, [url]);

  // hand the whole lifecycle to the caller
  return <>{children(state)}</>;
}