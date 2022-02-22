import React, { useState, useEffect } from "react";
import Router from "next/router";
import Navbar from "../../components/Layout/Navbar";
import Event from "../../components/Layout/Event";
import Spinner from "../../components/Form/Spinner";
import axios from "axios";
import moment from "moment";

const Events: React.FC = () => {
   const [events, setEvents] = useState<any>(null);
   const [user, setUser] = useState<any>(null);
   useEffect(() => {
      const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (!Boolean(currentUser)) {
         Router.push("/login");
         return;
      }
      const getEvents = async (id: number) => {
         const res = await axios.get(`/api/event`);
         setEvents(res.data.data);
      };
      const getCurrentUser = async (id: number) => {
         const res_ = await axios.get(`/api/auth/${id}`);
         setUser(res_.data.data[0]);
         console.log(user);
      };
      getEvents(currentUser.id);
      getCurrentUser(currentUser.id);
   }, []);

   return (
      <>
         <div className="h-screen p-20 bg-gray-100 px-9">
            <h1 className="text-2xl font-bold">Bookings</h1>
            <p className="mb-12 text-gray-400">
               See upcoming and past events booked through your event type links
            </p>
            <Navbar />
            {Boolean(events) ? (
               events.map((event: any) => (
                  <Event
                     key={event.id}
                     date={moment(event.date).format("dddd, Do MMM")}
                     time={
                        moment(event.date).format("HH:mm") +
                        " - " +
                        moment(event.date).add(15, "minutes").format("HH:mm")
                     }
                     title={"15 Minutes between " + event.name + " and Test"}
                     description={event.additional_note}
                     organizer={event.email}
                  />
               ))
            ) : (
               <Spinner class="w-10 h-10 border-[2px] border-black border-dotted rounded-full" />
            )}
         </div>
      </>
   );
};

export default Events;
