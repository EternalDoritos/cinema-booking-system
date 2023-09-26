import React, { useState, useMemo, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import Head from "next/head";
import { useRouter } from "next/router";
const CreateUser = () => {
  const router = useRouter();
  const form = useRef();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const createInvalidatedUser = async (e) => {
    e.preventDefault();
    const createUser = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/createInvalidatedUser`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: name,
          userName: userName,
          email: email,
          userType: userType,
        }),
      }
    );
    if (createUser.status === 200) {
      window.alert("User created successfully.");
      sendEmail();
      router.push("/UserProfileScreen");
    } else window.alert("Error creating account");
  };
  const sendEmail = (e) => {
    emailjs
      .sendForm(
        "goldenrizz",
        "template_980iw3t",
        form.current,
        "F2Ax9knazMafwkb4r"
      )
      .then(
        (result) => {
          window.alert("Email sent successfully!");
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <>
      <Head>
        <title>Create User</title>
      </Head>
      <h1 className="text-white text-center text-4xl pt-10 font-bold uppercase tracking-wider">
        Cinema Booking System Users
      </h1>
      <p className="text-white text-center text-base pt-2 pb-8  tracking-wider">
        {`Functions: Create new user(manager & staff)`}
      </p>
      <div>
        <div className="mb-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              ref={form}
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={createInvalidatedUser}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-400"
                >
                  Full name
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={handleNameChange}
                    placeholder="Full name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-400"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    name="username"
                    type="text"
                    onChange={handleUserNameChange}
                    placeholder="Username"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-400"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleEmailChange}
                    placeholder="Email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="userType"
                  className="block text-sm font-medium text-gray-400"
                >
                  User Type
                </label>
                <div className="mt-1">
                  <input
                    id="userType"
                    name="userType"
                    type="text"
                    onChange={handleUserTypeChange}
                    placeholder="User Type (Manager/ Staff)"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent  shadow-sm text-sm  bg-amber-300 hover:bg-amber-500 text-black font-bold rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create new user
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
