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
  console.log(user);
  let userToEdit = {
    id: user._id,
    username: user.username,
    userType: user.userType,
    isActive: user.isActive,
    hasAccess: user.hasAccess,
    email: user.email,
  };
  return (
    <>
      <div>
        <h1 class="text-white text-center text-4xl pt-10 font-bold uppercase tracking-wider">
          Edit user
        </h1>
        <h2 class="text-white text-center text-base pt-2 pb-5 font-semibold tracking-wider">
          User Info:
        </h2>
        <p class="text-white text-center text-base tracking-wider">
          {userToEdit.id}
        </p>
        <p class="text-white text-center text-base tracking-wider">
          {userToEdit.username}
        </p>
        <p class="text-white text-center text-base tracking-wider">
          {userToEdit.userType}
        </p>
        <p class="text-white text-center text-base tracking-wider">
          {userToEdit.isActive ? "true" : "false"}
        </p>
        <p class="text-white text-center text-base tracking-wider">
          {userToEdit.hasAccess ? "true" : "false"}
        </p>
        <p class="text-white text-center text-base tracking-wider">
          {userToEdit.email}
        </p>
        <form></form>
      </div>

      {/* Form or components for editing user */}
    </>
  );
};

export default EditUser;
