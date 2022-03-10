import axios from "axios";
import moment from "moment";
import Router from "next/router";
import React, { useState, useEffect } from "react";

import Spinner from "../../components/Form/Spinner";
import Event from "../../components/Layout/Event";
import Navbar from "../../components/Layout/Navbar";
import User from "../api/auth/signup.ts";

type Event = {
  name: string;
  email: string;
  date: DateTime;
  additional_note: string;
  organizer: User;
  organizerId: number;
  eventType: object;
  eventTypeId: number;
};
const Events: React.FC = () => {
  const [events, setEvents] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    console.log("**************************", currentUser);
    if (Object.keys(currentUser).length === 0) {
      Router.push("/events/step1");
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
  }, [events, user]);

  return (
    <>
      <div className="h-screen p-20 bg-gray-100 px-9">
        <h1 className="text-2xl font-bold">Bookings</h1>
        <p className="mb-12 text-gray-400">
          See upcoming and past events booked through your event type links
        </p>
        <Navbar />
        {events ? (
          events.map((event: Event) => (
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
