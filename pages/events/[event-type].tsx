import axios from "axios";
import { Formik } from "formik";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import * as Yup from "yup";

import Button from "../../components/Form/Button";
import TextInput from "../../components/Form/TextInput";

const EventType: React.FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDisabled, setDisabled] = useState<boolean>(false);
  const initialValues = {
    date: "",
  };
  const router = useRouter();

  const slug = router.query["event-type"];
  const getEventType = async (slug) => {
    const res = await axios.get(`/api/event-type/` + slug);
    return res.data.data;
  };
  const { data: event_type } = useQuery(["event_type", slug], () => (slug ? getEventType(slug) : null));
  console.log({ event_type });

  // All Validations
  const insertingValidationSchema = Yup.object().shape({
    date: Yup.string().required().label("Date"),
  });
  const handleSubmit = async (values) => {
    setLoading(true);
    setDisabled(false);
    Router.push("book?type=" + event_type.id + "&slug=" + event_type.slug + "&date=" + values.date);
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
                <p className="text-gray-500">{event_type.duration} Minutes</p>
                <p className="mt-2 text-gray-500">Africa/Kigali</p>
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
export default EventType;
