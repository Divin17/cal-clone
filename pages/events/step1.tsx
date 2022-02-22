import React, { useState } from "react";
import Image from "next/image";
import Router from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "../../components/Form/TextInput";
import Button from "../../components/Form/Button";

const Step2: React.FC = () => {
   const [isLoading, setLoading] = useState<boolean>(false);
   const [isDisabled, setDisabled] = useState<boolean>(false);
   const initialValues = {
      date: "",
   };
   // All Validations
   const insertingValidationSchema = Yup.object().shape({
      date: Yup.string().required().label("Date"),
   });
   const handleSubmit = async (values: any, onSubmitProps: any) => {
      setLoading(true);
      setDisabled(false);
      localStorage.setItem("dateTime", values.date);
      Router.push("step2");
   };

   return (
      <>
         <div className="flex flex-row h-full max-w-4xl m-auto mt-20 border shadow-default">
            <div className="w-1/2 px-16 my-10 border-r">
               <div className="w-1/6">
                  <Image
                     src="/images/user.png"
                     width={50}
                     height={50}
                     alt="testimonial-image"
                  />
               </div>
               <p className="text-gray-500">Daniel Tonel</p>
               <h1 className="mb-6 text-3xl font-bold text-primary">
                  15 Mins Meeting
               </h1>
               <div className="flex flex-row mt-6">
                  <div className="w-5/6">
                     <b>15 Minutes</b>
                     <p className="text-green-800-500">4:30 PM</p>
                  </div>
               </div>
            </div>
            <div className="w-1/2 max-w-lg px-16 py-10 bg-white ">
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
                           onChange={handleChange("date")}
                           onBlur={handleBlur("date")}
                           id="date"
                           label="date"
                           name="date"
                           errorMessage={errors.date}
                           preValue={values.date}
                           placeholder=""
                           type="datetime-local"
                           touched={touched.date}
                        />
                        <div className="flex flex-row content-start">
                           <Button
                              customClass="bg-black text-white"
                              isDisabled={isDisabled}
                              isLoading={isLoading}
                              buttonText="Next"
                           />
                        </div>
                     </form>
                  )}
               </Formik>
            </div>
         </div>
      </>
   );
};
export default Step2;
