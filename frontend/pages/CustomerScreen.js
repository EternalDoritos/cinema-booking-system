import React from "react";
import Head from "next/head";
import Link from "next/link";

const CustomerScreen = () => {
  return (
    <div>
      <Head>
        <title>CustomerScreen</title>
      </Head>
      <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wider">
        Customer Profile
      </h1>
      <div>
        <ul className="m-5 text-center ">
          <li>
            <Link legacyBehavior href="/customerComponents/viewLoyalty">
              <a className="text-center font-bold text-2xl text-amber-300">
                {" "}
                View loyalty points{" "}
              </a>
            </Link>
          </li>

          <li>
            <Link legacyBehavior href="/customerComponents/viewBooking">
              <a className="text-center font-bold text-2xl p-2 rounded text-amber-300">
                {" "}
                View bookings{" "}
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CustomerScreen;
