import { foodPantryDb } from "~/services/databases/food-pantry-db.server";
import { getActiveSemester } from "./active-semester.server";


export type AuthStates = "logged-out" | "authenticated" | "registered";


export const checkRegistrationStatus = async (userId: string) => {
  const { semesterId } = await getActiveSemester();
  const registrationDoc = await foodPantryDb
    .registrations
    .checkRegistration({ userId, semesterId });

  if (registrationDoc) {
    return "registered" as AuthStates;
  }

  return "authenticated" as AuthStates;
};