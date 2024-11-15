


const getEvents= async({userId}:{userId:string})=>{

  const testEvent = {
    name: "Test Pickup Event",
    id: "test-id",
    eventDate: new Date(),
  }

  return [testEvent]

}


const getReservations = async({userId}:{userId:string})=>{

  const testReservation ={
    id: "test-1",
    eventName: "Test Event",
    date: new Date("11-14-2024"),
    time_slot: "4:00 PM",
    confirm: "TEST",
    status: "approved",
  }

  return [ testReservation]
}


const getPageData = async ({userId}:{userId:string}) => {
  const openEvents = await getEvents({userId});
  const reservations = await getReservations({userId});

  return { openEvents, reservations };
};

export { getPageData };