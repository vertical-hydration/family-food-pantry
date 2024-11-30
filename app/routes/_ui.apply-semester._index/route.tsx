import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import type { Route } from './+types/route';
import { OpenSemestersCard } from './components/open-semesters-card';

export const loader = async (args: Route.LoaderArgs) => {
  await handleAuth(args);
  const data = await getPageData();
  return { ...data };
};

export const action = async (args: Route.ActionArgs) => {
  await handleAuth(args);
  return null;
};

export default function OpenSemestersRoute() {
  return (
    <>
      <OpenSemestersCard />
    </>
  )
}