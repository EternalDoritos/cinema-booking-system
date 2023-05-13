import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useState } from "react";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/movie");
  const data = await res.json();

  const cinema = await fetch("http://localhost:5000/cinema");
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

  const handleMovieChange = (e) => {
    setMovieId(e.target.value);
  };
  return (
    <div>
      <Head>
        <title>Add Listing</title>
      </Head>
      <div className="text-center m-4">
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
        <label for="cinema" className="m-2 text-2xl">
          Choose Date
        </label>
      </div>
    </div>
  );
};
export default DisplayGallery;
