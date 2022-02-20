import React from "react";
import Spinner from "./Spinner";

export type Props = {
   buttonText: string;
   isDisabled: boolean;
   onClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
   isLoading: boolean;
};

const Button: React.FC<Props> = (props) => {
   return (
      <button
         className={`${
            props.isDisabled
               ? "ring-1 text-red-300 ring-red-300 cursor-not-allowed"
               : "bg-green-500 hover:bg-green-400"
         } w-full text-white font-bold py-2 px-4 rounded mt-4 content-center`}
         type="submit"
         onClick={props.onClick}
         disabled={props.isDisabled}
      >
         {props.isLoading ? (
            <Spinner class="w-6 h-6 border-[2px] border-white border-dotted rounded-full" />
         ) : (
            props.buttonText
         )}
      </button>
   );
};
export default Button;
