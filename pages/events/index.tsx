import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useQuery } from "react-query";

import Shell from "@components/Shell";

import Spinner from "../../components/Form/Spinner";
import Event from "../../components/Layout/Event";
import Navbar from "../../components/Layout/Navbar";
import User from "../api/auth/signup";

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
  const getEvents = async () => {
    const res = await axios.get(`/api/events`);
    return res.data.data;
  };
  const { data: events, isLoading } = useQuery("events", getEvents);

  return (
    <Shell>
      <div className="h-screen p-20 bg-gray-100 px-9">
        <h1 className="text-2xl font-bold">Bookings</h1>
        <p className="mb-12 text-gray-400">
          See upcoming and past events booked through your event type links
        </p>
        <Link href="/api/auth/signout">
          {/* this is the default next-auth sign-out template. */}
          <a className="p-1 ml-2 text-white bg-black">LOGOUT</a>
        </Link>
        <Navbar />
        {events && !isLoading ? (
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
    </Shell>
  );
};

export default Events;
