import React from "react";
import { useContext } from "react";
import { Context } from "../../store/context";
import { useState, useEffect } from "react";
import Head from "next/head";

const DisplayBooking = () => {
  const [currentUser, setCurrentUser] = useContext(Context);
  const [seats, setSeats] = useState([]);
  useEffect(() => {
    const listing = async () => {
      await fetch(`http://localhost:5000/auth/getUserById/${currentUser._id}`)
        .then((res) => res.json())
        .then((data) => {
          setSeats(data.seatsBooked);
        });
    };
    currentUser && listing();
  }, [currentUser]);
  return (
    <div>
      <Head>
        <title>View Booking</title>
      </Head>
      {!currentUser && (
        <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wide">
          {" "}
          There's no user bookings to display
        </h1>
      )}
      {currentUser && (
        <div className="text-center">
          <label className="text-white  text-4xl py-10 font-bold uppercase tracking-wider">
            View bookings
          </label>
          <div className="mt-10 font-bold text-2xl underline"> Movie title</div>
          <div className="text-2xl"> still in progress </div>
          {console.log(seats)}
        </div>
      )}
    </div>
    // map?
  );
};

export default DisplayBooking;
