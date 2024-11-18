import { initializeFirestoreFoodPantryDb } from "food-pantry-db";
import { getServerEnv } from "~/lib/env-variables.server";


const { FIREBASE_APP_NAME, SERVICE_ACCOUNT} = getServerEnv();

const { foodPantryDb } = initializeFirestoreFoodPantryDb({
  FIREBASE_APP_NAME,
  SERVICE_ACCOUNT,
  collectionPaths:{
    users:"users",
    applications:"applications",
    events:"events",
    registrations:"registrations",
    reservations:"reservations",
  }
});

export { foodPantryDb }