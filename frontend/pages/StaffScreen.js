import React from "react";
import Head from "next/head";
import Link from "next/link";

const StaffScreen = () => {
  // Purchase Movie Tickets
  // Cancel Booking
  // Purchase Food & Drinks
  // Redeem Loyalty Points
  return (
    <div>
      <Head>
        <title>StaffScreen</title>
      </Head>
      <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wider">
        Staff Profile
      </h1>
      <div>
        <ul className="m-5 text-center ">
          <li>
            <Link legacyBehavior href="/staffComponents/CreateBooking">
              <a className="text-center font-bold text-2xl  p-2 rounded">
                {" "}Purchase Movie Tickets{" "}
              </a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="../purchaseFood">
              <a className="text-center font-bold text-2xl  p-2 rounded">
                {" "}Purchase Food & Drinks{" "}
              </a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/staffComponents/redeemLoyaltyPoints">
              <a className="text-center font-bold text-2xl  p-2 rounded">
                {" "}Redeem Loyalty Points{" "}
              </a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/staffComponents/CancelBooking">
              <a className="text-center font-bold text-2xl  p-2 rounded">
                {" "}Cancel Bookings{" "}
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StaffScreen;