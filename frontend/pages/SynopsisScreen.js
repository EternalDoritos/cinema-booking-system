import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MovieBookingPage from "./LocationTiming";

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
        <div className="bg-gray-800 grid lg:grid-cols-2 sm:grid-cols-1 border-8 border-gray-800">
          {/* <div className = "object-contain xl:h-4/6 xl:w-4/6 lg:h-auto lg:w-96 md:w-3/4">
        <img src={movie[0].image}></img>
        </div> */}
          <div className="object-contain xl:h-auto xl:w-4/6 lg:h-auto lg:w-96 md:w-3/4 mx-auto my-auto">
            <img src={movie[0].image} />
          </div>
          <div>
            <h1 className="xl:text-5xl sm:text-4xl font-semibold text-gray-200">
              {movie[0].title}
            </h1>
            <p className="mt-2 xl:text-4xl md:text-2xl underline underline-offset-1 text-gray-200">
              Synopsis
            </p>
            <p className="xl:text-4xl sm:text-2xl text-gray-200">
              {movie[0].description}
            </p>
          </div>
        </div>

        <MovieBookingPage />
        <div className="mt-8 border-t-2 border-gray-600 pt-8">
          <h2 className="text-2xl font-semibold text-gray-200">
            Reviews and Ratings
          </h2>
          <div className="mt-4">
            {movie[0].reviewsAndRatings.map((review) => (
              <div key={review._id} className="border rounded-lg p-4 mt-4">
                <p className="text-gray-200">
                  <span className="font-semibold">Name:</span>{" "}
                  {review.name.username}
                </p>
                <p className="text-gray-200">
                  <span className="font-semibold">Review:</span>{" "}
                  {review.reviews}
                </p>
                <p className="text-gray-200">
                  <span className="font-semibold">Rating:</span>{" "}
                  {review.ratings}
                </p>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default DisplaySynopsis;

// this is the screen where you put the movie location and timing
