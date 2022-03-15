import React from "react";

import Button from "../Form/Button";

export type Props = {
  date: string;
  time: string;
  title: string;
  description: string;
  organizer: string;
};

const Event: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-row content-between w-full px-3 py-5 mt-5 bg-white border mt border-primaryBorder shadow-default">
      <div className="w-1/12">
        <p>{props.date}</p>
        <p className="text-gray-400">{props.time}</p>
      </div>
      <div className="w-7/12 ml-8">
        <p className="font-bold">{props.title}</p>
        <p className="text-gray-400">{props.description}</p>
        <p>{props.organizer}</p>
      </div>
      <div className="w-2/12 px-5">
        <Button
          customClass="text-black border border-black"
          isDisabled={false}
          isLoading={false}
          buttonText="Cancel"
        />
      </div>
      <div className="w-2/12 px-5">
        <Button
          customClass="text-black border border-black"
          isDisabled={false}
          isLoading={false}
          buttonText="Reschedule"
        />
      </div>
    </div>
  );
};
export default Event;
