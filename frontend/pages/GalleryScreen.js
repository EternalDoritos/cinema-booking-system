import React from "react";
import Link from "next/link";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/movie");
  const data = await res.json();

  return {
    props: { movies: data },
  };
};

const DisplayGallery = ({ movies }) => {
  return (
    <div>
      <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wider">
        Movie List
      </h1>
      <div className="mb-8 ml-12 mr-12 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-black border-8 border-black">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 rounded-lg p-4">
            <Link href={`/SynopsisScreen?movieId=${movie._id}`}>
              <div className="card relative">
                <div className="bg-black-300 flex items-center justify-center">
                  <img
                    className="object-cover h-full w-full lg:h-70 xl:w-96"
                    src={movie.image}
                    alt={movie.title}
                    // style={{ objectFit: "cover" }} // Add this line
                  />
                </div>
                <div className="m-4">
                  <h3 className="text-lg font-bold mb-2 text-white">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-400">{movie.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayGallery;
