import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import EventSignupCard from './components/event-signup-card';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';

export const loader = async (args: LoaderFunctionArgs) => {
  const clerkUser = await handleAuth(args);
  const eventId = args.params.eventId as string;

  const data = await getPageData({ eventId });
  return { ...data, clerkUser };
};

export const action = async (args: ActionFunctionArgs) => {
  const clerkUser = await handleAuth(args);
  const formData = await args.request.formData();

  const primaryContact = {
    fname: clerkUser.fname,
    lname: clerkUser.lname,
    email: clerkUser.email,
    phone: clerkUser.phone,
  };
  return mutations.requestReservation({
    formData,
    primaryContact,
    userId: clerkUser.userId,
  });
};

export default function EventIdRoute() {
  return (
    <>
      <EventSignupCard />
    </>
  )
}