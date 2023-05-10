import React from "react";
import Head from "next/head";
import Link from "next/link";

const UserData = [
  {
    name: "John Doe",
    userType: "Customer",
    email: "johndoe@example.com",
    phoneNumber: "(555) 555-5555",
    active: false,
    suspended: true,
  },
  {
    name: "Jane Smith",
    userType: "Staff",
    email: "janesmith@example.com",
    phoneNumber: "(555) 555-5555",
    active: true,
    suspended: false,
  },
  {
    name: "Bob Johnson",
    userType: "Manager",
    email: "bobjohnson@example.com",
    phoneNumber: "(555) 555-5555",
    active: true,
    suspended: false,
  },
];
console.log(UserData);
//have yet to add functionality on CRUD of cinema and add movie listing
const SystemAdminScreen = () => {
  return (
    <div>
      <Head>
        <title>SystemAdminScreen</title>
      </Head>
      <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wider">
        System Admin Profile
      </h1>
      <div className="mb-8 sm:mx-auto sm:w-full sm:max-w-md">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Search User by Email
            </label>
            <div className="mt-1">
              <input
                id="userName"
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
              Search User
            </button>
          </div>
        </form>
      </div>
      <div class="overflow-x-auto">
        <table class="table w-full h-32">
          <thead>
            <tr>
              <th class="px-4 py-2 text-left">Name</th>
              <th class="px-4 py-2 text-left">User Type</th>

              <th class="px-4 py-2 text-left">Email</th>
              <th class="px-4 py-2 text-left">Phone</th>
              <th class="px-4 py-2 text-left">Active</th>
              <th class="px-4 py-2 text-left">Suspended</th>
              <th class="px-4 py-2 text-left">User Profile</th>
            </tr>
          </thead>
          <tbody class="overflow-y-auto">
            {UserData?.map((item, i) => {
              return (
                <tr key={i} class="border-b hover:bg-gray-500">
                  <td class="px-4 py-2">{item.name}</td>
                  <td class="px-4 py-2">{item.userType}</td>
                  <td class="px-4 py-2">{item.email}</td>
                  <td class="px-4 py-2">{item.phoneNumber}</td>

                  <td class="px-4 py-2 ">
                    {item.active ? "Active" : "Inactive"}
                  </td>
                  <td class="px-4 py-2 item.suspended?  ">
                    {item.suspended ? "Suspended" : "Not-suspended"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SystemAdminScreen;
