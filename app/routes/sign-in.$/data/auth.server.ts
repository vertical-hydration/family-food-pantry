import { redirect, LoaderFunctionArgs } from "react-router";
import { requireAuth } from "~/services/auth/clerk-auth.server";

export const handleAuth = async (args: LoaderFunctionArgs) => {
  
  // const data = await checkAuth(args);

  // // if user is authenticated, redirect to home page
  // if (data.authenticated) {
  //   throw redirect("/");
  // }

  // return data;
};
