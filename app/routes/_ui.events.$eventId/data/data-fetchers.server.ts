import { data, redirect } from "@remix-run/node";
import { foodPantryDb } from "~/services/databases/food-pantry-db.server";

const getPageData = async ({ 
  eventId 
}: { 
  eventId:string
}) => {
  const eventDoc = await foodPantryDb.events.read({eventId})
  if(!eventDoc){
    throw data(null, {status: 404, statusText: "Event not found"})
  }

  // check if event is open for requests
  // if not, redirect to home
  if(eventDoc.stage !== "open-for-requests"){
    throw redirect("/");
  }

  const docTimeSlots = eventDoc.timeSlots;

    // Turn timeSlots into an array of objects
  const timeSlots = Object.entries(docTimeSlots)
  .map(([key, value]) => ({id:key, label:value}))
  .sort((a,b)=> Number(a.id) - Number(b.id))

  // const timeSlots = [
  //   { id: "1600", label: "4:00 PM" },
  //   { id: "1630", label: "4:30 PM" },
  //   { id: "1700", label: "5:00 PM" },
  //   { id: "1730", label: "5:30 PM" },
  // ];

  const event ={
    id: eventDoc.id,
    name: eventDoc.name,
    type: eventDoc.type,
    stage: eventDoc.stage,
    eventDate: eventDoc.eventDate,
    semesterId: eventDoc.semesterId,
    timeSlots,
  }


  return { event };
};

export { getPageData };