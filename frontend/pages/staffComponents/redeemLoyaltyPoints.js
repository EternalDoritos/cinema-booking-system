import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const RedeemLoyaltyPoints = () => {

  const redeemLoyaltyPoints = async () => {
    
  };

  return (
    <>
      <Head>
        <title>Create Movie</title>
      </Head>
      <h1 className="text-center text-4xl text-bold m-4">
        Loyalty Point Redemption
      </h1>
      <div className="m-4 text-center">
        <form className="flex flex-col">
          <div className="m-4 text-xl">
            <label for="title">Customer Email: </label>
            <input
              type="text"
              size={40}
              className="text-black"
            ></input>
          </div>
        </form>

        <button
          className="rounded-full bg-cyan-900 m-4 p-2 px-5 text-2xl"
          onClick={redeemLoyaltyPoints}
        >
          Redeem
        </button>
      </div>
    </>
  );
};

export default RedeemLoyaltyPoints;