import { LoaderFunctionArgs } from '@remix-run/node';
import { requireAuth } from '~/services/auth/clerk-auth.server';

export const handleAuth = async (args: LoaderFunctionArgs) => {

  const { userId } = await requireAuth(args) 

  return { userId }
};