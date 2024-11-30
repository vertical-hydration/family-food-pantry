import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import PageLayout from './components/page-layout';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';

export const loader = async (args: LoaderFunctionArgs) => {
  const authdata = await handleAuth(args);
  return {};
};

export const action = async (args: ActionFunctionArgs) => {
  await handleAuth(args);

  return;
};

export default function SignInRoute() {
  return (
    <>
      <PageLayout />
    </>
  )
}