import {
  useLoaderData
} from '@remix-run/react';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import SubmitCard from './components/submit-card';
import { AddressFormCard } from './components/address-form-card';
import { StudentsCard } from './components/student-card';
import AdultsCard from './components/adults-card';
import MinorsCard from './components/minor-card';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId, email } = await handleAuth(args);
  const data = await getPageData({ userId, email });
  return { ...data };
};

export const action = async (args: ActionFunctionArgs) => {
  const { userId, email, fname, lname, phone } = await handleAuth(args);

  const semesterId = args.params.semId as string;

  const primaryContact = {
    fname,
    lname,
    email,
    phone
  }
  const formData = await args.request.formData();
  const intent = formData.get('intent') as string;

  if (intent === "updateAddress") {
    return mutations.updateAddress({
      formData,
      userId,
      email,
    });
  }

  if (intent === "addStudent") {
    formData.set("userId", userId);
    return mutations.addStudent({
      formData,
    })
  }

  if (intent === "removeStudent") {
    formData.set("userId", userId);
    return mutations.removeStudent({
      formData,
    })
  }

  if (intent === "updateAdults") {
    formData.set("userId", userId);
    return mutations.setAdults({
      formData,
    })
  }

  if (intent === "addMinor") {
    formData.set("userId", userId);
    return mutations.addMinor({
      formData,
    })
  }

  if (intent === "removeMinor") {
    formData.set("userId", userId);
    return mutations.removeMinor({
      formData,
    })
  }
  if (intent === "submitApplication") {

    return mutations.submitApplication({
      userId,
      primaryContact,
      semesterId,
    })
  }

  return null;
};

export default function ApplyRoute() {
  const { applied } = useLoaderData<typeof loader>();
  return (
    <div className='flex flex-col gap-4 px-5 py-5'>
      {
        applied ? <h1>Application already submitted.</h1>
          : <>
            <AddressFormCard />
            <StudentsCard />
            <MinorsCard />
            <AdultsCard />
            <SubmitCard />

          </>
      }
    </div>
  )
}