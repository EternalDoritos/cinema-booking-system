import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DisplaySynopsis = () => {
  const router = useRouter();
  let [movie, setMovie] = useState(null);
  useEffect(() => {
    if (!router.isReady) return;

    const movieId = router.query.movieId;
    fetch(`http://localhost:5000/movie/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.isReady, !movie]);
  if (!movie)
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  else {
    return (
      <>
        <img src={movie[0].image}></img>
      </>
    );
  }
};

export default DisplaySynopsis;

// this is the screen where you put the movie location and timing
