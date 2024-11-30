import { LoaderFunctionArgs } from 'react-router';
import { requireAuth } from '~/services/auth/clerk-auth.server';

export const handleAuth = async (args: LoaderFunctionArgs) => {
  return await requireAuth(args)
};