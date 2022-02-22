import React, { useEffect } from "react";
import Router from "next/router";
/**
 *this is a app pages
 *@return {JSX.Element}
 **/
export default function Home() {
   useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      Object.keys(user).length !== 0
         ? Router.push("/events")
         : Router.push("/login");
   }, []);
   return <div></div>;
}
