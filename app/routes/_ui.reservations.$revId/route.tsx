import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import ReservationCard from './components/reservation-card';

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await handleAuth(args);
  const revId = args.params.revId as string;

  const data = await getPageData({ userId, reservationId: revId });
  return { ...data };
};

export const action = async (args: ActionFunctionArgs) => {
  await handleAuth(args);
  return null;
};

export default function ReservationStatusRoute() {
  return (
    <>
      <ReservationCard />
    </>
  )
}