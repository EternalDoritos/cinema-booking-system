import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MovieBookingPage from "./LocationTiming";
import EditReview from "./LeaveReview";

const DisplaySynopsis = () => {
  const router = useRouter();
  let [movie, setMovie] = useState(null);
  const [timing, setTiming] = useState(null);

  // async function getData() {
  //   const id = router.query.movieId;
  //   const res = await fetch(``${process.env.NEXT_PUBLIC_API_URL}/listing/${id}`);
  //   setTiming(await res.json());
  // }
  useEffect(() => {
    if (!router.isReady) return;

    const movieId = router.query.movieId;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie/${movieId}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.isReady, router.query.movieId]);

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
            <h1 className="mb-5 xl:text-5xl sm:text-4xl font-semibold text-gray-200">
              {movie[0].title}
            </h1>
            <p className="mb-2 mt-2 xl:text-4xl md:text-2xl underline underline-offset-1 text-gray-200">
              Synopsis
            </p>
            <p className="xl:text-3xl sm:text-2xl text-gray-200">
              {movie[0].description}
            </p>
            <h1 className="mt-16 xl:text-4xl md:text-2xl underline underline-offset-1 text-gray-200">
              Trailer
            </h1>
            <div
              className="mt-2 relative h-0"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full object-cover"
                src={movie[0].trailer}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>

            {/* <iframe
              width="900"
              height="500"
              src={movie[0].trailer}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>  */}
          </div>
        </div>

        <MovieBookingPage id={router.query.movieId} />

        <div className="mt-8 border-t-2 border-gray-600 pt-8">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold">
              GoldenRizz Club Member's Reviews
            </h1>
          </div>
          <EditReview />
          <div className="mt-4 w-full md:w-3/4 mx-auto">
            {movie[0].reviewsAndRatings.map((review) => (
              <div key={review._id} className="border rounded-lg p-4 mt-4">
                <p className="text-gray-200">
                  <span className="font-semibold">Name:</span>{" "}
                  {review.name ? review.name.username : "Deleted User"}
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
