import React, { useState } from "react";
import { useRouter } from "next/router";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/movie");
  const data = await res.json();

  return {
    props: { movies: data },
  };
};

const CreateBooking = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState("");
  const router = useRouter();

  const handleMovieChange = (e) => {
    const movieId = e.target.value;
    setSelectedMovie(movieId);
  };

  const handleCreation = (e) => {
    e.preventDefault();
    router.push(`/SynopsisScreen?movieId=${selectedMovie}`);
  };

  return (
    <div>
      <h1 className="text-center m-4 text-bold text-4xl">Create Booking</h1>
      <div className="text-center flex flex-col m-4">
        <form>
          <label>
            Select a movie:
            <select
              value={selectedMovie}
              onChange={handleMovieChange}
              style={{ color: "#000000" }}
            >
              <option value="" style={{ color: "#000000" }}>
                Select a movie
              </option>
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </label>
          <br />
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded"
            onClick={handleCreation}
          >
            Place booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBooking;
