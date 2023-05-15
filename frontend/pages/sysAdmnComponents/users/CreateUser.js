import React, { useState, useMemo, useEffect } from "react";
import Head from "next/head";
const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [usertype, setUsertype] = useState("");
  const [email, setEmail] = useState("");
  const [customertype, setCustomertype] = useState("");
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleUserTypeChange = (e) => {
    setUsertype(e.target.value);
  };
  const handleCustomerTypeChange = (e) => {
    setCustomertype(e.target.value);
  };
  return (
    <>
      <Head>
        <title>Create Users</title>
      </Head>
      <h1 class="text-white text-center text-4xl pt-10 font-bold uppercase tracking-wider">
        Cinema Booking System Users
      </h1>
      <p class="text-white text-center text-base pt-2 pb-10  tracking-wider">
        Functions: Create new user(manager, staff, customer)
      </p>
      <div>
        <div className="mb-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="PUT">
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
                    placeholder="email"
                    autoComplete="email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-400"
                >
                  User Name
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    onChange={handleUsernameChange}
                    placeholder="username"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="usertype"
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
                    placeholder="usertype"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                  />
                </div>
              </div>
              {usertype === "customer" ? (
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-400"
                  >
                    Customer Type
                  </label>
                  <div className="mt-1">
                    <input
                      id="cutomerType"
                      name="cutomerType"
                      type="cutomerType"
                      onChange={handleCustomerTypeChange}
                      placeholder="Senior / Regular / Student"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                    />
                  </div>
                </div>
              ) : null}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent  shadow-sm text-sm  bg-amber-300 hover:bg-amber-500 text-black font-bold rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  //   onClick={updateUser}
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
