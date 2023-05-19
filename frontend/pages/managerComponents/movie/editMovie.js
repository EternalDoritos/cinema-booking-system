import React from "react";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/movie");
  const data = await res.json();

  return {
    props: { movies: data },
  };
};

const EditMove = ({ movies }) => {
  const [movieIdUpdate, setMovieIdUpdate] = useState(null);
  const [movieIdDelete, setMovieIdDelete] = useState(null);
  const [update, setUpdate] = useState(false);
  const [deleteEle, setDeleteEle] = useState(false);
  const router = useRouter();
  const handleEventCategory = (e) => {
    setMovieIdUpdate(e.target.value);
  };

  const handleEventCategoryDelete = (e) => {
    setMovieIdDelete(e.target.value);
  };

  const createMovie = () => {
    router.push("./createMovie");
  };

  const updateMovie = () => {
    router.push(
      `/managerComponents/movie/updateMovie?movieId=${movieIdUpdate}`
    );
  };

  const deleteMovie = async () => {
    const deleteMovie = await fetch("http://localhost:5000/movie", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: movieIdDelete,
      }),
    });
    if (deleteMovie.status === 200) {
      window.alert("Movie deleted");
      router.push("/");
    } else window.alert("Error deleting movie");
  };
  return (
    <>
      <Head>
        <title>Edit Movie</title>
      </Head>
      <h1 className="text-center m-4 text-bold text-4xl">Edit Movie Page</h1>
      <div className="text-center flex flex-col m-4">
        <div>
          <button
            className="m-4 text-xl font-bold rounded-full bg-cyan-900 p-5 m-4"
            onClick={createMovie}
          >
            Create New Movie
          </button>
        </div>
        <div>
          <button
            className="m-4 text-xl font-bold rounded-full bg-cyan-900 p-5 m-4"
            onClick={() => {
              setUpdate((update) => !update);
            }}
          >
            Update Movie
          </button>
          {update && (
            <div>
              <label for="movie" className="m-2 text-2xl">
                Choose movie:{" "}
              </label>
              <select
                name="movie"
                id="movie"
                value={movieIdUpdate}
                onChange={handleEventCategory}
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
              <button
                className="m-2 text-l font-bold rounded-full bg-green-500 p-2 px-6 m-2"
                onClick={updateMovie}
              >
                Update
              </button>
            </div>
          )}
        </div>
        <div>
          <button
            className="m-4 text-xl font-bold rounded-full bg-cyan-900 p-5 m-4"
            onClick={() => {
              setDeleteEle((deleteEle) => !deleteEle);
            }}
          >
            Delete Movie
          </button>
          {deleteEle && (
            <div>
              <label for="movie" className="m-2 text-2xl">
                Choose movie:{" "}
              </label>
              <select
                name="movie"
                id="movie"
                value={movieIdDelete}
                onChange={handleEventCategoryDelete}
                className="text-black"
              >
                <option disabled selected value className="text-center">
                  {" "}
                  -- select an option --{" "}
                </option>
                {movies.map((movie) => (
                  <option key={Math.random()} value={movie._id}>
                    {movie.title}
                  </option>
                ))}
              </select>
              <button
                className="m-2 text-l font-bold rounded-full bg-red-500 p-2 px-6 m-2"
                onClick={deleteMovie}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditMove;
