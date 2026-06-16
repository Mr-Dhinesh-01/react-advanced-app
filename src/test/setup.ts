// src/test/setup.ts — runs before every test file
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
// adds matchers like toBeInTheDocument(), toHaveTextContent()
import '@testing-library/jest-dom/vitest';

// unmount anything rendered, so tests don't bleed into each other
afterEach(() => {
  cleanup();
});