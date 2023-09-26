import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const UpdateCinema = () => {
  const [location, setLocation] = useState(null);
  const [seating, setSeating] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const cinemaId = router.query.cinemaId;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cinema/${cinemaId}`)
      .then((res) => res.json())
      .then((data) => {
        setLocation(data.location);
        setSeating(data.maxSeating);
      })
      .catch((err) => console.log(err));
  }, [router.isReady]);
  const locationChange = (e) => {
    setLocation(e.target.value);
  };

  const seatingChange = (e) => {
    setSeating(e.target.value);
  };

  const update = async () => {
    const maxSeating = +seating;
    const updateCinema = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/cinema`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: router.query.cinemaId,
          location,
          seating: maxSeating,
        }),
      }
    );
    if (updateCinema.status === 200) {
      window.alert("Cinema updated successfully");
      router.push("/");
    } else window.alert("Error updating cinema");
  };
  return (
    <>
      <Head>
        <title>Update Cinema</title>
      </Head>
      <h1 className="text-center text-4xl text-bold m-4">
        Update Cinema Listing
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
          onClick={update}
        >
          Update Cinema
        </button>
      </div>
    </>
  );
};

export default UpdateCinema;
