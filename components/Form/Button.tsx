/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import Spinner from "./Spinner";

export type Props = {
  buttonText: string;
  customClass: string;
  isDisabled: boolean;
  onClick?: (event: any) => void;
  isLoading: boolean;
};

const Button: React.FC<Props> = (props) => {
  return (
    <button
      className={`${
        props.isDisabled ? "opacity-80 cursor-not-allowed" : "hover:bg-black-200"
      } w-full font-bold py-2 px-4 mt-4 content-center ${props.customClass}`}
      type="submit"
      onClick={props.onClick}
      disabled={props.isDisabled}>
      {props.isLoading ? (
        <Spinner class="w-6 h-6 border-[2px] border-white border-dotted rounded-full" />
      ) : (
        props.buttonText
      )}
    </button>
  );
};
export default Button;
