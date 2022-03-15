import axios from "axios";
import { Formik } from "formik";
import moment from "moment";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";
import { useMutation } from "react-query";
import * as Yup from "yup";

import Button from "../../components/Form/Button";
import TextInput from "../../components/Form/TextInput";
import client from "../react-query-client.ts";
import { Event } from "./index";

const Book: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const initialValues = {
    name: "",
    email: "",
    note: "",
  };
  const router = useRouter();
  const date = router.query["date"];
  const type = router.query["type"];
  const event_type = client.getQueryData(["event_type"]);

  const createEvent = async (data) => await axios.post(`/api/events/create`, data);
  const mutation = useMutation((data) => createEvent(data), {
    onSuccess(data) {
      console.log({ data });
      setLoading(false);
      Router.push("success");
    },
    onError(error) {
      setLoading(false);
      console.log(error);
    },
  });
  // All Validations
  const insertingValidationSchema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().email().required().label("Email"),
    note: Yup.string().required().label("note"),
  });
  const handleSubmit = async (values: Event) => {
    setLoading(true);
    if (isLoading) return;
    // eslint-disable-next-line no-unused-vars
    mutation.mutate({
      name: values.name,
      email: values.email,
      note: values.note,
      date,
      eventTypeId: type,
    });
  };

  return (
    <>
      <div className="flex flex-row h-full max-w-4xl m-auto mt-20 border shadow-default">
        {event_type ? (
          <div className="w-1/2 px-16 my-10 border-r">
            <div className="w-1/6">
              <Image src="/images/globe.jpeg" width={50} height={50} alt="testimonial-image" />
            </div>
            <p className="text-gray-500">Daniel Tonel</p>
            <h1 className="mb-6 text-3xl font-bold text-primary">{event_type.name}</h1>
            <div className="flex flex-row mt-6">
              <div className="w-5/6">
                <b>{event_type.duration} Minutes</b>
                <p className="text-green-500">
                  {date ? moment(date).format("HH:mm, dddd Do MMM YYYY") : null}
                </p>
              </div>
            </div>
          </div>
        ) : null}
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
                  placeholder="John Doe"
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
                  placeholder="John@gmail.com"
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
                  placeholder="Share something that might be useful in preparing this meeting"
                  type="textarea"
                  touched={touched.note}
                />
                <div className="flex flex-row content-start">
                  <Button
                    customClass="bg-black text-white mr-3"
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    buttonText="Confirm"
                  />
                  <Button
                    customClass="text-black bg-white border border-black"
                    isDisabled={false}
                    isLoading={false}
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
export default Book;
