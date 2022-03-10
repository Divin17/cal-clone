import React from "react";

export type Props = {
  class: string;
};
const Spinner: React.FC<Props> = (props) => {
  return (
    <div className="flex justify-center">
      <div
        style={{ borderTopColor: "transparent" }}
        className={`content-center ${props.class} animate-spin`}></div>
    </div>
  );
};
export default Spinner;
