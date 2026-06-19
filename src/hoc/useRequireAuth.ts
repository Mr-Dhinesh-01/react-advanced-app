// src/hoc/useRequireAuth.ts — the hook equivalent
import { useAuth } from '../auth/authContext';

// returns true when there is a signed-in user
export function useRequireAuth(): boolean {
  const { user } = useAuth();
  return user !== null;
}

// usage inside a component:
//   const allowed = useRequireAuth();
//   if (!allowed) return <SignInPrompt />;
//   return <TheRealThing />;
