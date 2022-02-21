import React from "react";

export type Props = {
   id: string;
   name: string;
   onChange: (event: any) => void;
   onBlur: (event: any) => void;
   label: string;
   errorMessage?: any;
   placeholder: string;
   max?: number;
   required?: boolean;
   touched?: any;
   preValue?: string | number;
   type: string;
   options?: any;
};

const TextInput: React.FC<Props> = (props) => {
   let inputElement = null;
   switch (props.type) {
      case "select":
         inputElement = (
            <div className="relative">
               <select
                  className={`appearance-none border ${
                     props.errorMessage && props.touched && "border-red-500"
                  } w-full py-3 px-3 mb-2 text-gray-700  bg-white border pr-8 leading-tight focus:border-black`}
                  name={props.name}
                  onChange={props.onChange}
                  onBlur={props.onBlur}
               >
                  <option>Select {props.label}</option>
                  {Boolean(props.options)
                     ? props.options.map((option: any) => (
                          <option key={option.id} value={option.id}>
                             {option.name}
                          </option>
                       ))
                     : null}
               </select>
               <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                     className="fill-current h-4 w-4"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20"
                  >
                     <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
               </div>
            </div>
         );
         break;

      case "textarea":
         inputElement = (
            <textarea
               className={`appearance-none border ${
                  props.errorMessage && props.touched && "border-red-500"
               } w-full py-2 px-3 mb-2 text-gray-700`}
               name={props.name}
               onChange={props.onChange}
               onBlur={props.onBlur}
               maxLength={props.max}
               defaultValue={props.preValue}
               id={props.id}
               placeholder={props.placeholder ?? ""}
            ></textarea>
         );
         break;
      case "datetime-local":
         inputElement = (
            <input
               className={`appearance-none border ${
                  props.errorMessage && props.touched && "border-red-500"
               } w-full py-2 px-3 mb-2 text-gray-700`}
               name={props.name}
               type={props.type}
               onChange={props.onChange}
               onBlur={props.onBlur}
               defaultValue={props.preValue}
               maxLength={props.max}
               id={props.id}
               placeholder={props.placeholder ?? ""}
            />
         );
         break;
      default:
         inputElement = (
            <input
               className={`appearance-none border ${
                  props.errorMessage && props.touched && "border-red-500"
               } w-full py-2 px-3 mb-2 text-gray-700`}
               name={props.name}
               type={props.type}
               onChange={props.onChange}
               onBlur={props.onBlur}
               defaultValue={props.preValue}
               maxLength={props.max}
               id={props.id}
               placeholder={props.placeholder ?? ""}
            />
         );
         break;
   }
   return (
      <div className="w-full mb-1">
         <label className="block text-black text-sm font-bold mb-2">
            {props.label}
         </label>
         {inputElement}
         {props.touched && !!props.errorMessage && (
            <p
               className={`${
                  props.errorMessage && props.touched && "text-red-500"
               } text-xs`}
            >
               {props.errorMessage}
            </p>
         )}
      </div>
   );
};
export default TextInput;
