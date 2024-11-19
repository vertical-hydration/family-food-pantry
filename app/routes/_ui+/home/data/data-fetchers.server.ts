import { convertTo12Hour } from "~/lib/utils";
import { foodPantryDb } from "~/services/databases/food-pantry-db.server"



const getEvents= async({ userId }: { userId:string })=>{
  const eventDocs = await foodPantryDb
  .events
  .listByStages({ stages: ["open-for-pickups", "open-for-requests"]});



  // const testEvent = {
  //   name: "Test Pickup Event",
  //   id: "test-id",
  //   eventDate: new Date(),
  // }

  // return [testEvent]

  return eventDocs.map((doc)=>{
    return {
      id: doc.id,
      name: doc.name,
      eventDate: doc.eventDate,
      stage:doc.stage,
    }
  })

}


const getReservations = async({
  userId, 
  eventIds 
}: { 
  userId:string, 
  eventIds: string[] 
})=>{
  const reservationDocs = await foodPantryDb
  .reservations
  .checkUserReservations({
    userId,
    eventIdArray: eventIds
  })

  // const testReservation ={
  //   id: "test-1",
  //   eventName: "Test Event",
  //   date: new Date("11-14-2024"),
  //   time_slot: "4:00 PM",
  //   confirm: "TEST",
  //   status: "approved",
  // }

  // return [ testReservation]

  return reservationDocs.map((doc)=>{

    return {
      id: doc.id,
      eventId: doc.eventId,
      time: doc.time,
      confirm: doc.confirm,
      status: doc.status
    }
  })
}


const getPageData = async ({ userId }:{ userId:string }) => {
  const eventDocs = await getEvents({ userId });
  const eventIds = eventDocs.map((doc)=> doc.id)

  const reservationDocs = await getReservations({ userId, eventIds });
  const reservations = reservationDocs.map((reserveDoc)=>{
    const event= eventDocs
    .find((eventDoc)=> eventDoc.id ===reserveDoc.eventId);

    if(!event){
      throw new Error ("Event not found");
    }

    const docTime = reserveDoc.time.toString();
    const hour = docTime.substring(0, 2);
    const minute = docTime.substring(2, 4);
    const timeSlot = hour+":"+minute;
    const time_slot = convertTo12Hour(timeSlot);

    return {
      eventName: event.name,
      id: reserveDoc.id,
      date: event.eventDate.toLocaleDateString(),
      eventId: reserveDoc.eventId,
      status: reserveDoc.status,
      time: reserveDoc.time,
      confirm: reserveDoc.confirm,
      time_slot,
    };
  });

  const openEvents = eventDocs
  // filter only for events in the open-for-requests stage
  .filter((eventDoc) => eventDoc.stage === "open-for-requests")
  // filter out events that have reservations by the user
  .filter((eventDoc) => {
    if (!reservations) {
      return true;
    }
    const reservation = reservations.find((reservation) => {
      return reservation.eventId === eventDoc.id;
    });
    return !reservation;
  });


  return { openEvents, reservations };
};

export { getPageData };