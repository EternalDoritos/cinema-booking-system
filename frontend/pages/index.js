// const DisplayHome = () => {
//   return (
//     <div>
//       This is the HomeScreen. Click on navbar to navigate around the different
//       screens
//     </div>
//   );
// };

// export default DisplayHome;

import React, { useState } from "react";
import Link from "next/link";

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

  return (
    <div className="relative">
      <img
        className="w-full h-auto"
        src={images[currentSlide]}
        alt="slideshow"
      />
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        onClick={handlePrev}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
        onClick={handleNext}
      >
        &#10095;
      </button>
    </div>
  );
};


const DisplayHome = ({ movies }) => {
  const movieImages = movies.map((movie) => movie.image);

  return (
    
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-white text-center text-4xl pt-5" > Current Movies Screening</h1>
      <div className="mt-6 h-70 w-96">
        <Slideshow images={movieImages} />
      </div>
    <Link href = "/GalleryScreen">
      <button class="mt-6 bg-amber-300 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded">
                        View all Movies
      </button>
    </Link>
    </div>

  );
};

export default DisplayHome;
