import { ActionFunctionArgs, LoaderFunctionArgs, useLoaderData } from 'react-router';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import ReservationsCard from './components/reservations-card';


export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await handleAuth(args);
  const data = await getPageData({ userId });
  return { ...data };
};

export const action = async (args: ActionFunctionArgs) => {
  await handleAuth(args);
  return null;
};

export default function Route() {
  const loaderData = useLoaderData();
  return (
    <>
      <ReservationsCard />
      <pre>
        {JSON.stringify(loaderData, null, 2)}
      </pre>
    </>
  )
}