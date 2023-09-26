import React, { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
const UpdateMovie = () => {
  const [title, setTitle] = useState(null);
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState(null);
  const [poster, setPoster] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const movieId = router.query.movieId;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data[0].title);
        setImage(data[0].image);
        setDesc(data[0].description);
        setPoster(data[0].poster);
        setTrailer(data[0].trailer);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.isReady]);

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

  const updateMovie = async () => {
    const updateMovie = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/movie`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          image: image,
          description: desc,
          poster: poster,
          id: router.query.movieId,
          trailer: trailer,
        }),
      }
    );
    if (updateMovie.status === 200) {
      window.alert("Movie updated!");
      router.push("/");
    } else window.alert("Error updating movie");
  };
  if (!title)
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  else {
    return (
      <>
        <Head>
          <title>Update Movie</title>
        </Head>
        <h1 className="text-center text-4xl text-bold m-4">Update Movie</h1>
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
            onClick={updateMovie}
          >
            Update Movie
          </button>
        </div>
      </>
    );
  }
};
export default UpdateMovie;
