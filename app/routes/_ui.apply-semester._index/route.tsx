import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import { OpenSemestersCard } from './components/open-semesters-card';

export const loader = async (args: LoaderFunctionArgs) => {
  await handleAuth(args);
  const data = await getPageData();
  return { ...data };
};

export const action = async (args: ActionFunctionArgs) => {
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