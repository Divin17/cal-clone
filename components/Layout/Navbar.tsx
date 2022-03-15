import React from "react";

const Navbar: React.FC = () => {
  return (
    <div className="my-5">
      <ul className="flex border-b">
        <li className="-mb-px mr-1 border-b-2 border-solid border-black ">
          <a className="inline-block py-2 px-4 text-black font-semibold" href="#">
            Upcoming
          </a>
        </li>
        <li className="mr-1">
          <a className="inline-block py-2 px-4 text-black font-semibold" href="#">
            Past
          </a>
        </li>
        <li className="mr-1">
          <a className="inline-block py-2 px-4 text-black font-semibold" href="#">
            Cancelled
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
