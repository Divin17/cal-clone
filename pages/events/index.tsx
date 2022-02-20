import React from "react";
import Navbar from "../../components/Layout/Navbar";
import Event from "../../components/Layout/Event";

const Events: React.FC = () => {
   // const [events, setEvents] = useState<any>(null);
   // setEvents(null);
   return (
      <>
         <div className="bg-gray-100 p-20 px-9 h-full">
            <h1 className="font-bold text-2xl">Bookings</h1>
            <p className="text-gray-400 mb-12">
               See upcoming and past events booked through your event type links
            </p>
            <Navbar />
            <Event
               date="weekday"
               time="14:30"
               title="Hello"
               description="Hello There"
               organizer="divinfiston1@gmail.com"
            />
         </div>
      </>
   );
};

export default Events;
