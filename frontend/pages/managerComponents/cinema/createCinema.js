import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const CreateCinema = () => {
  const [location, setLocation] = useState(null);
  const [seating, setSeating] = useState(null);
  const router = useRouter();

  const locationChange = (e) => {
    setLocation(e.target.value);
  };

  const seatingChange = (e) => {
    setSeating(e.target.value);
  };

  const CreateCinema = async () => {
    const maxSeating = +seating;
    const CreateCinema = await fetch("http://localhost:5000/cinema", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location,
        seating: maxSeating,
      }),
    });
    if (CreateCinema.status === 200) {
      window.alert("Cinema created successfully");
      router.push("/");
    } else window.alert("Error creating cinema");
  };
  return (
    <>
      <Head>
        <title>Create Cinema</title>
      </Head>
      <h1 className="text-center text-4xl text-bold m-4">
        Create new Cinema Listing
      </h1>
      <div className="m-4 text-center">
        <form className="flex flex-col">
          <div className="m-4 text-xl">
            <label for="cinema">Cinema Location:</label>
            <input
              type="text"
              size={20}
              value={location}
              onChange={locationChange}
              className="text-black"
            ></input>
          </div>

          <div className="m-4 text-xl">
            <label for="seating">Max Seating:</label>
            <input
              type="number"
              value={seating}
              onChange={seatingChange}
              className="text-black"
            ></input>
          </div>
        </form>
        <button
          className="rounded-full bg-cyan-900 m-4 p-2 px-5 text-2xl"
          onClick={CreateCinema}
        >
          Create New Cinema
        </button>
      </div>
    </>
  );
};

export default CreateCinema;
