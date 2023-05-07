import React from "react";
import Head from "next/head";
import { useState, useEffect } from "react";
import MovieReport from "./movieReport";
import DateReport from "./dateReport";
export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/movie");
  const data = await res.json();

  return {
    props: { movies: data },
  };
};

const Report = ({ movies }) => {
  const [reportMovie, setReportMovie] = useState(null);
  const [reportDate, setReportDate] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [date, setDate] = useState("2023-01-01");

  async function generateReportMovie() {
    const res = await fetch("http://localhost:5000/admin/reportMovie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        movie: movieId,
      }),
    });
    setReportMovie(await res.json());
  }

  async function generateReportDate() {
    const res = await fetch("http://localhost:5000/admin/reportDate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: date,
      }),
    });
    setReportDate(await res.json());
  }

  const handleEventCategory = (e) => {
    setMovieId(e.target.value);
  };

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  //   useEffect(() => {
  //     console.log(movieId);
  //   }, [movieId]);

  return (
    <>
      <Head>
        <title>Generate Report </title>
      </Head>
      <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wider">
        Generate Report
      </h1>
      <div className="flex flex-col text-center">
        <form onSubmit={(event) => event.preventDefault()}>
          <div>
            <label for="movie" className="m-2 text-2xl">
              Choose movie:{" "}
            </label>
            <select
              name="movie"
              id="movie"
              value={movieId}
              onChange={handleEventCategory}
              className="text-black"
            >
              {movies.map((movie) => (
                <option key={Math.random()} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button
              onClick={generateReportMovie}
              className="rounded-full bg-cyan-900 p-3 m-4"
            >
              Generate Movie Report
            </button>
          </div>

          {reportMovie && <MovieReport report={reportMovie} />}
          <div className="m-5">
            <label for="date" className="m-2 text-2xl">
              Choose Date:{" "}
            </label>
            <input
              type="date"
              className="text-black"
              value={date}
              onChange={handleDate}
            />
            <div>
              <button
                onClick={generateReportDate}
                className="rounded-full bg-cyan-900 p-3 m-4"
              >
                Generate Date Report
              </button>
              {reportDate && <DateReport report={reportDate} />}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Report;
