import { Formik } from "formik";
import { GetServerSidePropsContext } from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";

import { getSession } from "@helpers/auth";

import Button from "../../components/Form/Button";
import TextInput from "../../components/Form/TextInput";
import { User } from "./signup";

interface ServerSideProps {
  csrfToken: string;
}

export default function Login({ csrfToken }: ServerSideProps) {
  const initialValues = {
    email: "",
    password: "",
  };
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const callbackUrl = typeof router.query?.callbackUrl === "string" ? router.query.callbackUrl : "/events";
  const insertingValidationSchema = Yup.object().shape({
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().required().label("Password"),
  });
  async function handleSubmit(values: User) {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const response = await signIn<"credentials">("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl,
    });
    if (!response) {
      throw new Error("Received empty response from next auth");
    }

    if (response.error) {
      setIsSubmitting(false);
      alert("Credentials not matching");
      throw new Error("Login Failed");
    }
    window.location.replace(callbackUrl);
  }

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <div className="w-full max-w-md m-auto">
          <h1 className="mb-6 text-3xl font-bold text-center text-primary">Cal.com</h1>
          <h1 className="mb-6 text-3xl font-bold text-center text-primary">Signin to your account</h1>
          <div className="w-full max-w-md px-16 py-10 m-auto bg-white border border-primaryBorder shadow-default">
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              enableReinitialize
              validationSchema={insertingValidationSchema}>
              {({ values, handleChange, handleSubmit, setFieldValue, touched, handleBlur, errors }) => (
                <form onSubmit={handleSubmit}>
                  <input name="csrfToken" type="hidden" defaultValue={csrfToken || undefined} hidden />
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
                    customClass="text-white bg-black"
                    isDisabled={isSubmitting}
                    isLoading={isSubmitting}
                    buttonText="Sign in"
                  />
                </form>
              )}
            </Formik>
          </div>
          <p className="mt-6 text-sm text-center ">
            Doesnt have an account?
            <Link href="/auth/signup">
              <a className="font-bold underline hover:text-black">create an account</a>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
