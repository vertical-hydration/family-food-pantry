import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';
import { getPageData } from './data/data-fetchers.server';
import { SignUp } from '@clerk/remix';
import PageLayout from './components/page-layout';

export const loader = async (args: LoaderFunctionArgs) => {
  await handleAuth(args);
  return {};
};

export const action = async (args: ActionFunctionArgs) => {
  await handleAuth(args);
  return null;
};

export default function Route() {
  return (
    <PageLayout />
  );
}