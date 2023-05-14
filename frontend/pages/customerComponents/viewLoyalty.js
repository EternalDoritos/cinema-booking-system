import React from "react";
import { useContext } from "react";
import { Context } from "../../store/context";
import { useState, useEffect } from "react";
import Head from "next/head";

const DisplayLoyalty = () => {
  const [currentUser, setCurrentUser] = useContext(Context);

  return (
    <div>
      <Head>
        <title>View Loyalty Points</title>
      </Head>
      {!currentUser && (
        <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wide">
          {" "}
          There's no user information to display
        </h1>
      )}
      {currentUser && (
        <div className="text-center">
          <label className="text-white  text-4xl py-10 font-bold uppercase tracking-wider">
            View loyalty
          </label>
          <div className="mt-10 font-bold text-2xl underline"> User Name</div>
          <div className="text-2xl">{currentUser.username}</div>
          <div className="mt-6 font-bold text-2xl underline"> User Type</div>
          <div className="text-2xl">{currentUser.userType}</div>
          <div className="mt-6 font-bold text-2xl underline">
            {" "}
            Loyalty Points
          </div>
          <div className="text-2xl">{currentUser.loyaltyPoints}</div>
        </div>
      )}
    </div>
  );
};

export default DisplayLoyalty;
