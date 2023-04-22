import Link from "next/link";
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
      <div className = "bg-gray-800 grid grid-cols-2">
        <div className = "ml-20 object-contain h-auto w-96">
        <img src={movie[0].image}></img>
        </div>
        <div>
        <h1 className="text-4xl font-semibold text-gray-200">{movie[0].title}</h1>
        <p className="mt-2 text-2xl underline underline-offset-1 text-gray-200">Synopsis</p>
        <p className="text-2xl text-gray-200">{movie[0].description}</p>
        </div>
      </div>

      {/*Removing this next time after implementing Location/Timing to click  */}
      <Link href = {'SeatingScreen'}>
      <button class="mt-6 mb-6 bg-amber-300 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded">
        Proceed to Seating Arrangement
      </button>
      </Link>
      </>
    );
  }
};

export default DisplaySynopsis;

// this is the screen where you put the movie location and timing
