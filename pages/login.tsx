import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../components/Form/TextInput";
import Button from "../components/Form/Button";

const Login: React.FC = () => {
   const [isLoading, setLoading] = useState<boolean>(false);
   const [isDisabled, setDisabled] = useState<boolean>(false);
   // All Validations
   const insertingValidationSchema = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
      password: Yup.string().required().label("Password"),
   });
   const handleSubmit = async (values: any, onSubmitProps: any) => {
      try {
         setLoading(true);
         setDisabled(false);
         // eslint-disable-next-line no-unused-vars
         const result = await axios
            .post("api/auth/login", {
               email: values.email,
               password: values.password,
            })
            .then((res) => {
               localStorage.setItem("token", res.data.token);
               localStorage.setItem("user", JSON.stringify(res.data.data));
               Router.push("/events");
            })
            .catch((error) => {
               alert(error.response.data.error);
               setLoading(false);
            });
      } catch (error) {
         console.log(error);
         setLoading(false);
      }
   };
   return (
      <>
         <div className="h-screen flex bg-gray-bg1">
            <div className="w-full max-w-md m-auto">
               <h1 className="text-3xl font-bold text-primary text-center mb-6">
                  Cal.com
               </h1>
               <h1 className="text-3xl font-bold text-primary text-center mb-6">
                  Signin to your account
               </h1>
               <div className="w-full max-w-md m-auto bg-white border border-primaryBorder shadow-default py-10 px-16">
                  <Formik
                     initialValues={{
                        email: "",
                        password: "",
                     }}
                     onSubmit={handleSubmit}
                     enableReinitialize
                     validationSchema={insertingValidationSchema}
                  >
                     {({
                        values,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        touched,
                        handleBlur,
                        errors,
                     }) => (
                        <form onSubmit={handleSubmit}>
                           <TextInput
                              onChange={handleChange("email")}
                              onBlur={handleBlur("email")}
                              id="email"
                              label="Email address"
                              name="email"
                              errorMessage={errors.email}
                              preValue={values.email}
                              placeholder=""
                              type="email"
                              touched={touched.email}
                           />
                           <TextInput
                              onChange={handleChange("password")}
                              onBlur={handleBlur("password")}
                              id="password"
                              label="Password"
                              name="password"
                              errorMessage={errors.password}
                              preValue={values.password}
                              placeholder=""
                              type="password"
                              touched={touched.password}
                           />
                           <Button
                              isDisabled={isDisabled}
                              isLoading={isLoading}
                              buttonText="Sign in"
                           />
                        </form>
                     )}
                  </Formik>
               </div>
               <p className="text-center text-sm mt-6 ">
                  Doesnt have an account?
                  <Link href="/register">
                     <a className="underline hover:text-black font-bold">
                        create an account
                     </a>
                  </Link>
               </p>
            </div>
         </div>
      </>
   );
};
export default Login;
