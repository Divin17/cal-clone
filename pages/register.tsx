import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import TextInput from "../components/Form/TextInput";
import Button from "../components/Form/Button";

const Register: React.FC = () => {
   const [isLoading, setLoading] = useState<boolean>(false);
   const [isDisabled, setDisabled] = useState<boolean>(false);
   const initialValues = {
      name: "",
      email: "",
      password: "",
   };
   // All Validations
   const insertingValidationSchema = Yup.object().shape({
      name: Yup.string().required().label("Name"),
      email: Yup.string().email().required().label("Email"),
      password: Yup.string().required().label("Password"),
   });
   const handleSubmit = async (values: any, onSubmitProps: any) => {
      try {
         setLoading(true);
         setDisabled(false);
         // eslint-disable-next-line no-unused-vars
         const body = {
            name: values.name,
            email: values.email,
            password: values.password,
         };
         // eslint-disable-next-line no-unused-vars
         const result = await axios
            .post("api/auth/register", {
               name: values.name,
               email: values.email,
               password: values.password,
            })
            .then((res) => {
               Router.push("/login");
            })
            .catch((error) => {
               alert(error.response.data.error);
               setLoading(false);
            });
      } catch (error) {
         setLoading(false);
         console.error(error);
      }
   };

   return (
      <>
         <div className="h-screen flex flex-row bg-gray-bg1">
            <div className="w-1/2 py-10 px-16">
               <h1 className="text-3xl font-bold text-primary mb-6">Cal.com</h1>
               <h1 className="text-6xl font-bold text-primary mb-6">
                  You are one step away from simple scheduling
               </h1>
               <p className="text-gray-500">
                  &quot;I love being able to use a tool that just works, and
                  that is open source. As a developer, I love being empowered to
                  contribute to a tool that I use regularly.&quot;
               </p>
               <div className="flex flex-row mt-6">
                  <div className="w-1/6">
                     <Image
                        src="/images/user.png"
                        width={50}
                        height={50}
                        alt="testimonial-image"
                     />
                  </div>
                  <div className="w-5/6">
                     <b>
                        Cassidy Williams{" "}
                        <a href="#" className="text-blue-500">
                           @cassidoo
                        </a>
                     </b>
                     <p className="text-gray-500">
                        Director of Developer Experience at Netlify
                     </p>
                  </div>
               </div>
            </div>
            <div className=" w-1/2 max-w-lg m-auto bg-white  border border-primaryBorder shadow-default py-10 px-16">
               <h1 className="text-2xl font-bold text-primary mt-1">
                  Start 14 days free trial
               </h1>
               <p className="text-gray-400 text-sm mb-3">
                  <b>No credit card required.</b> Try all pro features for 14
                  days.
                  <br />
                  Update at any time for $12/month.
               </p>
               <hr className="mb-7" />

               <Formik
                  initialValues={initialValues}
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
                           onChange={handleChange("name")}
                           onBlur={handleBlur("name")}
                           id="name"
                           label="name"
                           name="name"
                           errorMessage={errors.name}
                           preValue={values.name}
                           placeholder=""
                           type="text"
                           touched={touched.name}
                        />
                        <TextInput
                           onChange={handleChange("email")}
                           onBlur={handleBlur("email")}
                           id="email"
                           label="Email"
                           name="email"
                           errorMessage={errors.email}
                           preValue={values.email}
                           placeholder=""
                           type="text"
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
                           buttonText="Sign up for free"
                        />
                     </form>
                  )}
               </Formik>
               <p className="text-center text-sm mt-5 ">
                  Already have an account?
                  <Link href="/login">
                     <a className="underline hover:text-black">Login</a>
                  </Link>
               </p>
            </div>
         </div>
      </>
   );
};
export default Register;
