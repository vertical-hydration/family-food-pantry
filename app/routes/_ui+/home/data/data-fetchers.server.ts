


const getEvents= async()=>{

  const testEvent = {
    name: "Test Pickup Event",
    id: "test-id",
    eventDate: new Date(),
  }

  return [testEvent]

}


const getReservations = async()=>{

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


const getPageData = async () => {
  const openEvents = await getEvents();
  const reservations = await getReservations();

  return { openEvents, reservations };
};

export { getPageData };