import React from "react";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/cinema");
  const data = await res.json();

  return {
    props: { cinema: data },
  };
};

const EditCinema = ({ cinema }) => {
  const [cinemaIdUpdate, setCinemaIdUpdate] = useState(null);
  const [cinemaIdDelete, setCinemaIdDelete] = useState(null);
  const [update, setUpdate] = useState(false);
  const [deleteEle, setDeleteEle] = useState(false);
  const router = useRouter();
  const handleUpdate = (e) => {
    setCinemaIdUpdate(e.target.value);
  };

  const handleDelete = (e) => {
    setCinemaIdDelete(e.target.value);
  };

  const createCinema = () => {
    router.push("/createCinema");
  };

  const updateCinema = () => {
    router.push(`/updateCinema?cinemaId=${cinemaIdUpdate}`);
  };

  const deleteCinema = async () => {};

  return (
    <>
      <Head>
        <title>Edit Cinema Details</title>
      </Head>
      <h1 className="text-center m-4 text-bold text-4xl">Edit Movie Page</h1>
      <div className="text-center flex flex-col m-4">
        <div>
          <button
            className="m-4 text-xl font-bold rounded-full bg-cyan-900 p-5 m-4"
            onClick={createCinema}
          >
            Create New Cinema
          </button>
        </div>
        <div>
          <button
            className="m-4 text-xl font-bold rounded-full bg-cyan-900 p-5 m-4"
            onClick={() => {
              setUpdate((update) => !update);
            }}
          >
            Update Cinema
          </button>
          {update && (
            <div>
              <label for="cinema" className="m-2 text-2xl">
                Choose cinema:{" "}
              </label>
              <select
                name="cinema"
                id="cinema"
                value={cinemaIdUpdate}
                onChange={handleUpdate}
                className="text-black"
              >
                <option disabled selected value className="text-center">
                  -- select an option --
                </option>
                {cinema.map((val) => (
                  <option key={Math.random()} value={val._id}>
                    {val.location}
                  </option>
                ))}
              </select>
              <button
                className="m-2 text-l font-bold rounded-full bg-green-500 p-2 px-6 m-2"
                onClick={updateCinema}
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
            Delete Cinema
          </button>
          {deleteEle && (
            <div>
              <label for="cinema" className="m-2 text-2xl">
                Choose cinema:{" "}
              </label>
              <select
                name="cinema"
                id="cinema"
                value={cinemaIdDelete}
                onChange={handleDelete}
                className="text-black"
              >
                <option disabled selected value className="text-center">
                  {" "}
                  -- select an option --{" "}
                </option>
                {cinema.map((val) => (
                  <option key={Math.random()} value={val._id}>
                    {val.location}
                  </option>
                ))}
              </select>
              <button
                className="m-2 text-l font-bold rounded-full bg-red-500 p-2 px-6 m-2"
                onClick={deleteCinema}
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
export default EditCinema;
