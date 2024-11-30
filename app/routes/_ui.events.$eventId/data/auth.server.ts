import { LoaderFunctionArgs } from '@remix-run/node';
import { requireAuth } from '~/services/auth/clerk-auth.server';

export const handleAuth = async (args: LoaderFunctionArgs) => {
  const clerkData = await requireAuth(args)

  return {...clerkData}
};