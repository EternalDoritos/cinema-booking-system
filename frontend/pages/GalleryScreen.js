import Link from "next/link";
import Head from "next/head";
import Images from "next/image";
import { useContext } from "react";
import { Context } from "../store/context";
//import useGlobalStore from "../store/store";

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie`);
  const data = await res.json();

  return {
    props: { movies: data },
  };
};

const DisplayGallery = ({ movies }) => {
  //const user = useGlobalStore((state) => state.userProfile);
  return (
    <div>
      <Head>
        <title>Movie List</title>
      </Head>
      <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wider">
        Movie List
      </h1>
      <div className="mb-8 ml-12 mr-12 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-black border-8 border-black">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-lg p-4 cursor-pointer"
          >
            <Link passHref={`/SynopsisScreen?movieId=${movie._id}`}>
              <div className="card relative">
                <div className="bg-black-300 flex items-center justify-center">
                  <Image
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
