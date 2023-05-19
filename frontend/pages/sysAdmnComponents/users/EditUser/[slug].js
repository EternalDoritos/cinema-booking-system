import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const pid = context.params.slug;
  const res = await fetch(`http://localhost:5000/auth/getUserById/${pid}`);
  const data = await res.json();
  return {
    props: { user: data },
  };
}

const EditUser = ({ user }) => {
  const router = useRouter();
  let userToEdit = {
    id: user._id,
    username: user.username,
    userType: user.userType,
    isActive: user.isActive,
    hasAccess: user.hasAccess,
    email: user.email,
  };
  const [username, setUsername] = useState(`${userToEdit?.username}`);
  const [usertype, setUsertype] = useState(`${userToEdit?.userType}`);
  const [email, setEmail] = useState(`${userToEdit?.email}`);
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
  const updateUser = async (e) => {
    e.preventDefault();
    const updatedUser = await fetch(
      `http://localhost:5000/auth/editUser/${user._id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          userType: usertype,
          // customerType: customertype,
          email: email,
        }),
      }
    );
    if (updatedUser.status === 200) {
      window.alert(
        "User updated successfully, redirecting to system admin home page."
      );
      router.push("/UserProfileScreen");
    } else window.alert("Error updating account");
  };

  return (
    <>
      <div>
        <h1 class="text-white text-center text-4xl pt-10 font-bold uppercase tracking-wider">
          Edit user
        </h1>
        <h2 class="text-white text-center text-base pt-2 pb-5 font-semibold tracking-wider">
          User Info: {userToEdit.id}
        </h2>
      </div>
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
                  placeholder={userToEdit.email}
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
                  placeholder={userToEdit.username}
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
                  placeholder={userToEdit.userType}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
              </div>
            </div>
            {userToEdit.userType === "customer" ? (
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
                    placeholder={userToEdit.userType}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                  />
                </div>
              </div>
            ) : null}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent  shadow-sm text-sm  bg-amber-300 hover:bg-amber-500 text-black font-bold rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={updateUser}
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Form or components for editing user */}
    </>
  );
};
export default EditUser;
//Edit User -> getUserById -> getUserById
