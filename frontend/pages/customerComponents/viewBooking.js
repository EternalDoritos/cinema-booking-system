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
          `http://localhost:5000/auth/getCustomerById/${currentUser._id}`
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

  const formatTime = (time) => {
    if (time) {
      const timeString = time.toString().padStart(4, "0");
      const formattedTime = new Date(
        `2000-01-01T${timeString.substring(0, 2)}:${timeString.substring(2, 4)}`
      );
      return formattedTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return "";
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
            <label className="text-white text-4xl py-10 font-bold uppercase tracking-wider">
              Movie Bookings
            </label>
            <div className="mt-9">
              {seats.length === 0 && (
                <p className="text-white text-center text-lg">
                  User did not book any movies yet
                </p>
              )}
              {seats.map((info) => (
                <div
                  key={info.movieList?._id}
                  className="my-4 border border-gray-300 p-4 ml-6 mr-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-lg font-semibold">Title:</p>
                      <p>{info.movieList?.movie?.title}</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">Location:</p>
                      <p>{info.movieList?.cinema?.location}</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">Date:</p>
                      <p>{formatDate(info.movieList?.date)}</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">Time:</p>
                      <p>{formatTime(info.movieList?.time)}</p>
                    </div>
                    <div className="grid grid-col 2">
                      <div>
                        <p className="text-lg font-semibold">Booked seats:</p>
                      </div>
                      <div>
                        {info.seating.map((seat, seatIndex) => (
                          <span
                            key={seatIndex}
                            className="text-white bg-blue-500 px-2 py-1 rounded ml-2"
                          >
                            {getSeatLabel(seat)}
                            {seatIndex !== info.seating.length - 1 && ""}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
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
