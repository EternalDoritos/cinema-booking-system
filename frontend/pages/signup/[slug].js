import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";
export async function getServerSideProps(context) {
  const userName = context.params.slug;
  const res = await fetch(
    `http://localhost:5000/auth/getUserByUsername/${userName}`
  );
  const data = await res.json();
  return {
    props: {
      user: data,
    },
  };
}

const Signup = ({ user }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log("User ID: ", user?._id);
  const handleUserNameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const validateUserAccount = async (e) => {
    e.preventDefault();
    const validateUser = await fetch(
      "http://localhost:5000/auth/validateUserAccount",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName: username, password: password }),
      }
    );
    if (validateUser.status === 200) {
      window.alert("User account validated successfully");
      router.push("/UserLogInScreen");
    } else window.alert("Error validating user account");
  };

  return (
    <>
      <h1 class="text-white text-center text-4xl pt-10 font-bold uppercase tracking-wider">
        Cinema Booking System Users
      </h1>
      <p class="text-white text-center text-base pt-2 pb-8  tracking-wider">
        Validate your account by filling up the details below!
      </p>
      <div>
        <div className="mb-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={validateUserAccount}
            >
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
                    name="name"
                    type="text"
                    value={username}
                    placeholder={user?.username}
                    onChange={handleUserNameChange}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-400"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
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
                  Validate Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;
