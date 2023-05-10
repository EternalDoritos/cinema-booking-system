import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import Link from "next/link";
import { useState, useEffect } from "react";

const MovieBookingPage = ({ id }) => {
  const router = useRouter();
  const [timing, setTiming] = useState([]);

  const purchaseTicket = () => {
    router.push("./SeatingScreen");
  };
  useEffect(() => {
    async function getData() {
      const id = router.query.movieId;
      const res = await fetch(`http://localhost:5000/listing/${id}`);
      setTiming(await res.json());
    }
    getData();
  }, []);
  return (
    // <div className="min-h-screen ">
    <div>
      <Head>
        <title>Movie Booking</title>
      </Head>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Movie Showtimes</h1>
      </div>
      {timing.length < 1 ? (
        <h1 className="text-center m-4 text-3xl text-bold">
          No timing available
        </h1>
      ) : (
        <>
          <div className="grid grid-cols-4 text-center">
            <div>
              <h4 className="text-bold text-xl">Location</h4>
            </div>
            <div>
              <h4 className="text-bold text-xl">Date</h4>
            </div>
            <h4 className="text-bold text-xl">Time</h4>
            <h4></h4>
          </div>
          {timing.map((ele) => {
            return (
              <div
                className="grid grid-cols-4 text-center m-4"
                key={Math.random()}
              >
                <div>
                  <h4>{ele.cinema.location}</h4>
                </div>
                <div>
                  <h4>{ele.date}</h4>
                </div>
                <div>
                  <h4>{ele.time}</h4>
                </div>
                <button
                  className="rounded-full bg-cyan-900"
                  onClick={purchaseTicket}
                >
                  Book Now
                </button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default MovieBookingPage;
