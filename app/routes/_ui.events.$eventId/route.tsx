import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import { Route } from './+types/route';
import EventSignupCard from './components/event-signup-card';

export const loader = async (args: Route.LoaderArgs) => {
  const { userId } = await handleAuth(args);
  const eventId = args.params.eventId;
  console.log("eventId", eventId);

  const data = await getPageData({ eventId });
  return { ...data };
};

export const action = async (args: Route.ActionArgs) => {
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