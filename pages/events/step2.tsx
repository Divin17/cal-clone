import axios from "axios";
import { Formik } from "formik";
import Image from "next/image";
import Router from "next/router";
import React, { useState } from "react";
import * as Yup from "yup";

import Button from "../../components/Form/Button";
import TextInput from "../../components/Form/TextInput";

const Step2: React.FC = () => {
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
      const date = localStorage.getItem("dateTime");
      // eslint-disable-next-line no-unused-vars
      const result = await axios
        .post("/api/event/create", {
          name: values.name,
          email: values.email,
          note: values.note,
          date,
        })
        .then((res) => {
          Router.push("success");
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
      <div className="flex flex-row h-full max-w-4xl m-auto mt-20 border shadow-default">
        <div className="w-1/2 px-16 my-10 border-r">
          <div className="w-1/6">
            <Image src="/images/user.png" width={50} height={50} alt="testimonial-image" />
          </div>
          <p className="text-gray-500">Daniel Tonel</p>
          <h1 className="mb-6 text-3xl font-bold text-primary">15 Mins Meeting</h1>
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
            validationSchema={insertingValidationSchema}>
            {({ values, handleChange, handleSubmit, setFieldValue, touched, handleBlur, errors }) => (
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
                <h3 className="my-4 font-bold">+ Additional Guests</h3>
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
                <div className="flex flex-row content-start">
                  <Button
                    customClass="bg-black text-white mr-3"
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    buttonText="Confirm"
                  />
                  <Button
                    customClass="text-black bg-white border border-black"
                    isDisabled={isDisabled}
                    isLoading={isLoading}
                    buttonText="Cancel"
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
