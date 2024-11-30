import { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import EventsCard from './components/events-card';
import ReservationsCard from './components/reservations-card';
import type { Route } from './+types/route';

export const loader = async (args: Route.LoaderArgs) => {
  const { userId } = await handleAuth(args);
  const data = await getPageData({ userId });
  return { ...data };
};

export const action = async (args: Route.ActionArgs) => {
  await handleAuth(args);
  return null;
};

export default function IndexRoute() {
  return (
    <>
      <EventsCard />
      <ReservationsCard />
    </>
  )
}