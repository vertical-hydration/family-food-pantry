import type { Route } from '../+types/route';
import { requireAuth } from '~/services/auth/clerk-auth.server';

export const handleAuth = async (args: Route.LoaderArgs) => {
  return await requireAuth(args);
};