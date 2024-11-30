import { redirect } from "react-router";
import { getActiveSemester } from "~/lib/business-logic/active-semester.server";
import { foodPantryDb } from "~/services/databases/food-pantry-db.server";

const getPageData = async ({ userId, email }: { userId: string, email:string }) => {
  const userProfileDoc = await foodPantryDb.users.read({ id: userId });

  const redirectLinks = {
    address: "/address",
    students: "/students",
    minors: "/minors",
    adults: "/adults",
  };

  // get active semester
  const { semesterId } = await getActiveSemester();

  // check if application already exists
  const applicationDoc = await foodPantryDb
    .applications
    .checkApplication({ userId, semesterId });

  // if (applicationDoc) {
  //   throw redirect("/status");
  // }
  const applied = applicationDoc ? true : false;

 
  const defaultAddress = {
    street: "",
    unit: "",
    city: "",
    state: "NC",
    zip:"",
  }

  const address = userProfileDoc?.address ?? defaultAddress ;
  const students = userProfileDoc?.students ?? [];
  const adults = userProfileDoc?.household_adults ?? 1;
  const minors = userProfileDoc?.minors ?? [];

  const language = userProfileDoc?.language ?? "en";



  return {
    address,
    language,
    redirectLinks,
    students,
    minors,
    adults,
    applied,
    email,
  };
};

const getPrimaryContact = async ({ userId }: { userId: string }) => {
  const primaryContact = {
    fname: "Homer",
    lname: "Simpson",
    email: "homer@simpson.com",
    phone: "555-555-5555",
  };
  return primaryContact;
};

export { getPageData };
