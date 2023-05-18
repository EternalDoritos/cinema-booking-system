import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/context";
import Head from "next/head";

const DisplayBooking = () => {
  const [currentUser, setCurrentUser] = useContext(Context);
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser) {
        const response = await fetch(
          `http://localhost:5000/auth/getUserById/${currentUser._id}`
        );
        const data = await response.json();
        setSeats(data.seatsBooked);
      }
    };

    fetchUser();
  }, [currentUser]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getSeatLabel = (index) => {
    const row = Math.floor(index / 5) + 65; // ASCII code for 'A' is 65
    const col = (index % 5) + 1;
    return String.fromCharCode(row) + col;
  };

  return (
    <div className="bg-gray-800 min-h-screen py-8">
      <div>
        <Head>
          <title>View Bookings</title>
        </Head>
        {console.log(seats)}
        {!currentUser && (
          <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wide">
            There's no user bookings to display
          </h1>
        )}
        {currentUser && (
          <div className="text-center">
            <label className="text-white  text-4xl py-10 font-bold uppercase tracking-wider">
              Movie Bookings
            </label>
            <div className="mt-9">
              {seats.map((info) => (
                <div key={info.movieList._id}>
                  <span> </span>
                  <p>Title: {info.movieList.movie.title}</p>
                  <p>Location: {info.movieList.cinema.location}</p>
                  <p>Date: {formatDate(info.movieList.date)}</p>
                  <p>Time: {info.movieList.time}</p>
                  Booked seats:{" "}
                  {info.seating.map((seat, seatIndex) => (
                    <span key={seatIndex}>
                      {getSeatLabel(seat)}
                      {seatIndex !== info.seating.length - 1 && ", "}
                    </span>
                  ))}
                  <div className="mb-8"> </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayBooking;
