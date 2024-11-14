import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import EventsCard from './components/events-card';
import ReservationsCard from './components/reservations-card';

export const loader = async (args: LoaderFunctionArgs) => {
  await handleAuth(args);
  const pageData = await getPageData();
  return { ...pageData };
};

export const action = async (args: ActionFunctionArgs) => {
  await handleAuth(args);
  return null;
};

export default function Route() {
  return (
    <>
      <EventsCard />
      <ReservationsCard />
    </>
  )
}