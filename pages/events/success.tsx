import React from "react";

const Success: React.FC = () => {
  return (
    <>
      <div className="h-screen flex bg-gray-bg1">
        <div className="w-full max-w-xl m-auto bg-white border border-primaryBorder shadow-default py-10 px-16">
          <h1 className="text-3xl font-bold text-primary text-center mb-6">This meeting is scheduled</h1>
          <p className="mb-4 text-center">
            We emailed you and the other attendees a calendar invitation with all the details.
          </p>
          <hr />
          <div className="flex flex-row my-3">
            <p className="w-1/4">What</p>
            <p className="w-3/4">15 Min Meeting between Daniel Tonel and Test</p>
          </div>
          <div className="flex flex-row my-3">
            <p className="w-1/4">What</p>
            <p className="w-3/4">Wednesday, 29 December 2021 4:30pm-15 mins (Europe/Vienna)</p>
          </div>
          <hr />
          <div className="flex flex-row my-3">
            <p className="w-2/5">Add to calendar</p>
            <div className="w-3/5">
              <span className="inline-flex items-center px-4 py-2 text-sm text-gray-900 bg-white border border-black  m-2">
                G
              </span>
              <span className="inline-flex items-center px-4 py-2 text-sm text-gray-900 bg-white border border-black m-2">
                G
              </span>
              <span className="inline-flex items-center px-4 py-2 text-sm text-gray-900 bg-white border border-black m-2">
                G
              </span>
              <span className="inline-flex items-center px-4 py-2 text-sm text-gray-900 bg-white border border-black m-2">
                G
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Success;
