/* eslint-disable @next/next/no-img-element */

import { useLoginMutation } from "@/redux/features/auth/authAPI";
import Link from "next/link";
import { useEffect, useState } from "react";
import Error from "../ui/Error";
import InButtonLoader from "../ui/loader/InButtonLoader";

function LoginForm() {
  const [input, setInput] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showError, setShowError] = useState("");
  const [login, { data, isError, isLoading, error }] = useLoginMutation();

  // check error when component mount

  useEffect(() => {
    if (isError) {
      setShowError(error?.data?.msg);
    } 
  }, [error, isError]);

  // handlers

  // input value change handler
  const changeHandler = (e) => {
    setShowError("");
    setInput({ ...input, [e.target.name]: e.target.value });
    if (e.target.name === "email") {
      setEmailError("");
    } else if (e.target.name === "password") {
      setPasswordError("");
    }
  };

  // on submit handler

  const submitHandler = (e) => {
    e.preventDefault();
    if (!input.email) {
      setEmailError("email is required!");
    } else if (!input.password) {
      setPasswordError("password is required!");
    } else {
      login(input);
    }
  };

  return (
    <div className="min-h-screen  flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">Your Logo</h1>
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form className="px-5 py-7" onSubmit={submitHandler}>
            {/* email  */}
            <label
              className="font-semibold text-sm text-gray-600 pb-1 block"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              type="text"
              required
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              name="email"
              id="email"
              value={input.email}
              onChange={changeHandler}
            />
            {emailError && <Error msg={emailError} />}
            {/* password  */}
            <label
              className="font-semibold text-sm text-gray-600 pb-1 block"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="text"
              required
              className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              id="password"
              value={input.password}
              name="password"
              onChange={changeHandler}
            />
            {passwordError && <Error msg={passwordError} />}
            <button
              type="submit"
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              disabled={isLoading}
            >
              <span className="inline-block mr-2">Login</span>
              {isLoading ? (
                <InButtonLoader size = {10} color = "#ffffff" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 inline-block"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              )}
            </button>

            {showError && <Error msg={showError} />}
          </form>

          <div className="py-5 px-5">
            <div className="grid grid-cols-2 gap-1 items-center">
              <div className="text-center sm:text-left whitespace-nowrap">
                <Link href={"/"} legacyBehavior>
                  <a className="text-red-400 underline">Forgate Password ?</a>
                </Link>
              </div>
              <div className="text-center sm:text-right whitespace-nowrap ">
                <Link href={"/signup"} legacyBehavior>
                  <a className="text-red-400 underline">Sign Up</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
