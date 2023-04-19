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
      <h1 class="text-white text-center text-4xl pt-5"> Movie List</h1>
      <div class="mt-8 grid grid-cols-3 gap-10 bg-black">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray rounded-lg p-4">
            <Link href={'/SynopsisScreen'}>
              <a>
                <div class="card relative">
                  <div className="bg-black-300">
                    <img
                      className="object-fill h-70 w-96"
                      src={movie.image}
                      alt={movie.title}
                    />
                  </div>
                  <div class="m-4">
                    <h3 class="text-lg font-bold mb-2">{movie.title}</h3>
                    <span class="text-sm">{movie.description}</span>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayGallery;
