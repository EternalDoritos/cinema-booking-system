// import Link from "next/link";
// import { useEffect, useState } from "react";

// export const getStaticProps = async () => {
//   const res = await fetch("http://localhost:5000/movie");
//   const data = await res.json();

//   return {
//     props: { movies: data },
//   };
// };

// const Slideshow = ({ images }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const totalSlides = images.length;

//   const handlePrev = () => {
//     setCurrentSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
//   };

//   const handleNext = () => {
//     setCurrentSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
//   };

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((currentSlide) =>
//         currentSlide === totalSlides - 1 ? 0 : currentSlide + 1
//       );
//     }, 4000);
//     return () => clearInterval(timer);
//   }, [totalSlides]);

//   return (
//     <div className="relative">
//       <img
//         className="w-full h-full object-cover"
//         src={images[currentSlide]}
//         alt="slideshow"
//       />
//       <button
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//         onClick={handlePrev}
//       >
//         &#10094;
//       </button>
//       <button
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//         onClick={handleNext}
//       >
//         &#10095;
//       </button>
//       <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 bg-opacity-50 text-white">
//         <p className="text-center">{`${currentSlide + 1} / ${totalSlides}`}</p>
//       </div>
//     </div>
//   );
// };

// const DisplayHome = ({ movies }) => {
//   const movieImages = movies.map((movie) => movie.poster);

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wider">
//         {" "}
//         Current Movies Screening
//       </h1>
//       <div className="mt-6 h-110 w-110 object-cover">
//         <Slideshow images={movieImages} />
//       </div>
//       <Link href="/GalleryScreen">
//         <button class="mt-6 bg-amber-300 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded">
//           View all Movies
//         </button>
//       </Link>
//     </div>
//   );
// };

// export default DisplayHome;

import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/movie");
  const data = await res.json();

  return {
    props: { movies: data },
  };
};

const Slideshow = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = images.length;

  const handlePrev = () => {
    setCurrentSlide(currentSlide === 0 ? totalSlides - 1 : currentSlide - 1);
  };

  const handleNext = () => {
    setCurrentSlide(currentSlide === totalSlides - 1 ? 0 : currentSlide + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((currentSlide) =>
        currentSlide === totalSlides - 1 ? 0 : currentSlide + 1
      );
    }, 4000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  // Define a class to set the height and width of the images
  const imageClass = "h-full w-full object-cover";

  return (
    <div className="relative">
      <Head>
        <title>Home</title>
      </Head>
      <img
        className={imageClass} // Apply the class to the <img> tag
        src={images[currentSlide]}
        alt="slideshow"
      />
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        onClick={handlePrev}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        onClick={handleNext}
      >
        &#10095;
      </button>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 bg-opacity-50 text-white">
        <p className="text-center">{`${currentSlide + 1} / ${totalSlides}`}</p>
      </div>
    </div>
  );
};

const DisplayHome = ({ movies }) => {
  const movieImages = movies.map((movie) => movie.poster);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wider">
        {" "}
        Current Movies Screening
      </h1>
      <div className="mt-6 2xl:h-4/6 2xl:w-4/6 xl:w-5/6 sm:w-full object-cover uppercase tracking-wider">
        <Slideshow images={movieImages} />
      </div>
      <Link href="/GalleryScreen">
        <button class="mt-6 mb-6 bg-amber-300 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded">
          View all Movies
        </button>
      </Link>
    </div>
  );
};

export default DisplayHome;
