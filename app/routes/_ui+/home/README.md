# Purpose
The home page allows users to see events that are open for people to request a food box at.

## Definitions
On the home page users can see open events. An event is any opportunity for a user to request a food box.


A request for a food box at an event is called a reservation.  

Each reservation has a for digit confirmation code. This is confirmation that the request was received and can be given to food pantry staff to quickly track the request. It is not confirmation that a box has been reserved. That is tracked in the status of the reservation. 


## Auth
These functions will be handled by the auth.server.ts file.
All users are either "logged-out", "authenticated" or "registered".

Registered users have been authenticated and have been approved by staff for the semester.

This page is only for registered users. Authenticated users will be redirected to the register route.

Logged out users will be redirected to the sign-in route.

## Page Data
These functions will be handled by the data-fetchers.server.ts file.

This page will need:

#### Events
This is the list of events that are open for the user to register.

#### Reservations
This is the list of active reservations or for food boxes. This should also have confirmation code.

### Data considerations
Since a user can only register for an event once, any event they have already applied is no longer open by by definition.


This means we need to pull a list of "open" events. We then need to check for any reservations that the user might have made for those events. If we find a previous reservation we then need to remove it from the events list.


## Mutations
There will be no mutations that this path does. Users will be linked to pages for requesting a reservation for an event.


## Components

### Events Card
This component will contain a list of open events.

### Events List
This component will be list of events

### Reservation Card
This component will contain the list of reservations.

### Reservations List
This component will be the list of reservations.


