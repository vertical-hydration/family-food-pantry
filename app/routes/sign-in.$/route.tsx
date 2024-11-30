import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import PageLayout from './components/page-layout';
import { Route } from './+types/route';

export const loader = async (args: Route.LoaderArgs) => {
  const authdata = await handleAuth(args);
  return;
};

export const action = async (args: Route.ActionArgs) => {
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