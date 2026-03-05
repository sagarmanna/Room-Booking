Project Overview

This project is a Hotel Room Booking Dashboard UI built using Next.js, React, and Tailwind CSS.
The application allows users to browse rooms, filter them based on different criteria, and simulate a booking process.

The goal of the project is to demonstrate component-based architecture, clean state management, and a responsive UI.
Deployment Link : https://room-booking-bice.vercel.app/
Features

Room listing with card layout

Room filtering:

Search

Price range

Room type

Bed type

Rating

Infinite scroll for loading more rooms

Booking modal for room reservations

Payment simulation

Booking history

Admin analytics dashboard

Responsive UI design

Dark mode support

Tech Stack

Frontend:

Next.js

React

Tailwind CSS

Framer Motion

Backend (optional API simulation):

Django / Django REST Framework

Project Structure
app/
   dashboard/
   bookings/
   payment/
   admin/

components/
   layout/
   rooms/
   booking/

services/
   api.js

context/
   BookingContext.js
Setup Instructions
1. Clone the Repository
git clone https://github.com/your-username/hotel-booking-ui.git
cd hotel-booking-ui
2. Install Dependencies
npm install

or

yarn install
3. Run Development Server
npm run dev

Open the browser and go to:

http://localhost:3000
Environment Requirements

Node.js 18+

npm or yarn

Modern browser (Chrome, Edge, Firefox)

Edge Case Handling

The application includes handling for:

API failures

Loading states

Large datasets using infinite scrolling

Safe UI rendering when data is unavailable

More details are I explained in architecture-notes.txt.
