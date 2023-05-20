import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const CreateMovie = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [poster, setPoster] = useState("");
  const [trailer, setTrailer] = useState("");
  const router = useRouter();

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const imageChange = (e) => {
    setImage(e.target.value);
  };

  const descChange = (e) => {
    setDesc(e.target.value);
  };
  const posterChange = (e) => {
    setPoster(e.target.value);
  };

  const trailerChange = (e) => {
    setTrailer(e.target.value);
  };

  const createMovie = async () => {
    //title, image, description,poster
    const createMovie = await fetch("http://localhost:5000/movie", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        image: image,
        description: desc,
        poster: poster,
        trailer: trailer,
      }),
    });
    if (createMovie.status === 200) {
      window.alert("Movie successfully created");
      router.push("/");
    } else {
      window.alert("Error creating movie");
    }
  };
  return (
    <>
      <Head>
        <title>Create Movie</title>
      </Head>
      <h1 className="text-center text-4xl text-bold m-4">
        Create New Movie Listing
      </h1>
      <div className="m-4 text-center">
        <form className="flex flex-col">
          <div className="m-4 text-xl">
            <label for="title">Movie Title: </label>
            <input
              type="text"
              size={40}
              value={title}
              onChange={titleChange}
              className="text-black"
            ></input>
          </div>
          <div className="m-4 text-xl">
            <label for="image">Movie Image: </label>
            <input
              type="text"
              size={40}
              value={image}
              className="text-black"
              onChange={imageChange}
            ></input>
          </div>
          <div className="m-4 text-xl">
            <label for="description">Movie Description:</label>
            <div>
              <textarea
                rows={5}
                cols={50}
                className="text-black"
                onChange={descChange}
                value={desc}
              >
                {desc}
              </textarea>
            </div>
          </div>
          <div className="m-4 text-xl ">
            <label for="poster">Movie Poster: </label>
            <input
              type="text"
              size={40}
              value={poster}
              className="text-black"
              onChange={posterChange}
            ></input>
          </div>
          <div className="m-4 text-xl ">
            <label for="trailer">Movie Trailer: </label>
            <input
              type="text"
              size={40}
              value={trailer}
              className="text-black"
              onChange={trailerChange}
            ></input>
          </div>
        </form>

        <button
          className="rounded-full bg-cyan-900 m-4 p-2 px-5 text-2xl"
          onClick={createMovie}
        >
          Create New Listing
        </button>
      </div>
    </>
  );
};

export default CreateMovie;
