import { foodPantryDb } from "~/services/databases/food-pantry-db.server";
import { FieldPath } from "firebase-admin/firestore"

const getReservationDocs = async ({ 
  userId,  
}: { 
  userId: string, 
}) => {
  const reservationCollection = foodPantryDb.reservations.collection;

  const querySnapshot = await reservationCollection
    .where("userId", "==", userId)
    .get();

    const docs = querySnapshot.docs.map((doc) => doc.data());
    return docs;
};

const getEventDocsForReservations = async ({ 
  eventIdArray 
}: { 
 eventIdArray: string[]
}) => {
  const eventsCollection = foodPantryDb.events.collection;

  if(eventIdArray.length < 1){
    return [];
  }

  const querySnapshot = await eventsCollection
    .where(FieldPath.documentId(), "in", eventIdArray)
    .get();

    return querySnapshot.docs.map((doc) => doc.data());
};



const getPageData = async ({ userId }: { userId: string }) => {
  // get reservations for user

  const reservationsDocs = await getReservationDocs({ userId});

  const eventIdArray = reservationsDocs.map((r) => r.eventId);
  const eventDocs = await getEventDocsForReservations({ eventIdArray });

  const reservations = reservationsDocs
  .map((reserveDoc)=>{
    const event = eventDocs.find((eventDoc)=>{
      return eventDoc.id === reserveDoc.eventId;
    });
    if(event === undefined){
      throw new Error("Event not found");
    }
    return {
      ...reserveDoc,
      eventName: event.name,
      eventDate: event.eventDate,
      status: reserveDoc.status,
      time: reserveDoc.time,
    };
  }).sort((a, b) => b.eventDate.valueOf() - a.eventDate.valueOf());


  return { reservations, eventDocs };
};

export { getPageData };