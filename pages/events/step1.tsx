import React, { useState } from "react";
import Image from "next/image";
import Router from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import TextInput from "../../components/Form/TextInput";
import Button from "../../components/Form/Button";

const Step1: React.FC = () => {
   const [isLoading, setLoading] = useState<boolean>(false);
   const [isDisabled, setDisabled] = useState<boolean>(false);
   const initialValues = {
      name: "",
      email: "",
      note: "",
   };
   // All Validations
   const insertingValidationSchema = Yup.object().shape({
      name: Yup.string().required().label("Name"),
      email: Yup.string().email().required().label("Email"),
      note: Yup.string().required().label("note"),
   });
   const handleSubmit = async (values: any, onSubmitProps: any) => {
      try {
         setLoading(true);
         setDisabled(false);
         // eslint-disable-next-line no-unused-vars
         const body = {
            name: values.name,
            email: values.email,
            note: values.note,
         };
         // eslint-disable-next-line no-unused-vars
         const result = await axios
            .post("api/auth/register", {
               name: values.name,
               email: values.email,
               note: values.note,
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
         <div className="max-h-fit max-w-screen-lg flex flex-row bg-gray-bg1 mx-40 my-20 border border-primaryBorder shadow-default">
            <div className="w-1/2 py-10 px-16 border-r">
               <div className="w-1/6">
                  <Image
                     src="/images/user.png"
                     width={50}
                     height={50}
                     alt="testimonial-image"
                  />
               </div>
               <p className="text-gray-500">Daniel Tonel</p>
               <h1 className="text-3xl font-bold text-primary mb-6">
                  15 Mins Meeting
               </h1>
               <div className="flex flex-row mt-6">
                  <div className="w-5/6">
                     <b>15 Minutes</b>
                     <p className="text-green-800-500">4:30 PM</p>
                  </div>
               </div>
            </div>
            <div className=" w-1/2 max-w-lg m-auto bg-white px-16 py-12">
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
                           onChange={handleChange("note")}
                           onBlur={handleBlur("note")}
                           id="note"
                           label="Additional notes"
                           name="note"
                           errorMessage={errors.note}
                           preValue={values.note}
                           placeholder=""
                           type="textarea"
                           touched={touched.note}
                        />
                        <Button
                           isDisabled={isDisabled}
                           isLoading={isLoading}
                           buttonText="Confirm"
                        />
                     </form>
                  )}
               </Formik>
            </div>
         </div>
      </>
   );
};
export default Step1;
