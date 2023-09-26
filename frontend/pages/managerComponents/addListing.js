import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie`);
  const data = await res.json();

  const cinema = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cinema`);
  const cinemaData = await cinema.json();
  return {
    props: { movies: data, cinemas: cinemaData },
  };
};

//movieId
//cinemaId
//time
//date
const DisplayGallery = ({ movies, cinemas }) => {
  const [movieId, setMovieId] = useState(null);
  const [cinemaId, setCinemaId] = useState(null);
  const [time, setTime] = useState(null);
  const [date, setDate] = useState(null);
  const router = useRouter();

  const handleMovieChange = (e) => {
    setMovieId(e.target.value);
  };

  const handleCinemaChange = (e) => {
    setCinemaId(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const addListing = async () => {
    const add = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        movie: movieId,
        cinema: cinemaId,
        date,
        time,
      }),
    });
    if (add.status === 200) {
      window.alert("Successfully added new movie listing");
      router.push("/");
    } else window.alert("Error adding new listing");
  };
  return (
    <div>
      <Head>
        <title>Add Listing</title>
      </Head>
      <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracker-wider">
        Add New Movie Listing
      </h1>
      <div className="text-center m-2">
        <div>
          <label for="movie" className="m-2 text-2xl">
            Choose movie:{" "}
          </label>
          <select
            name="movie"
            id="movie"
            value={movieId}
            onChange={handleMovieChange}
            className="text-black"
          >
            <option disabled selected value className="text-center">
              -- select an option --
            </option>
            {movies.map((movie) => (
              <option key={Math.random()} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label for="cinema" className="m-2 text-2xl">
            Choose Cinema:{" "}
          </label>
          <select
            name="cinema"
            id="cinema"
            value={cinemaId}
            onChange={handleCinemaChange}
            className="text-black"
          >
            <option disabled selected value className="text-center">
              -- select an option --
            </option>
            {cinemas.map((val) => (
              <option key={Math.random()} value={val._id}>
                {val.location}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label for="date" className="m-2 text-2xl">
            Choose Date:{" "}
          </label>
          <input
            type="date"
            className="text-black"
            value={date}
            onChange={handleDateChange}
          ></input>
        </div>
        <div>
          <label for="time" className="m-2 text-2xl">
            Choose Time:{" "}
          </label>
          <input
            type="number"
            className="text-black"
            value={time}
            onChange={handleTimeChange}
          ></input>
        </div>
        <div>
          <button
            className="m-4 p-4 bg-cyan-900 rounded-full"
            onClick={addListing}
          >
            Add Listing
          </button>
        </div>
      </div>
    </div>
  );
};
export default DisplayGallery;
