import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles//index.module.css";
export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie`);
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
      <div className="relative w-full h-[90vh] border-4 border-amber-300">
        <Image
          className={imageClass} // Apply the class to the <img> tag
          src={images[currentSlide]}
          alt="slideshow"
          layout="fill"
        />
      </div>
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
    <div className={styles.container}>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wider">
          {" "}
          Current Movies Screening
        </h1>
        <div className="mt-6 2xl:h-4/6 2xl:w-4/6 xl:w-5/6 sm:w-full object-cover uppercase tracking-wider">
          <Slideshow images={movieImages} />
        </div>
        <Link href="/GalleryScreen">
          <button className="mt-6 mb-6 bg-amber-300 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded">
            View all Movies
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DisplayHome;

// gif above, video below

// PREVIOUS DRAFT is the above commented out code
// Below is the current changes:
// import Head from "next/head";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// export const getStaticProps = async () => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie`);
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

//   // Define a class to set the height and width of the images
//   const imageClass = "h-full w-full object-cover";

//   return (
//     <div className="relative">
//       <Head>
//         <title>Home</title>
//       </Head>
//       <div className="border-4 border-amber-300">
//         <img
//           className={imageClass} // Apply the class to the <img> tag
//           src={images[currentSlide]}
//           alt="slideshow"
//         />
//       </div>
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

// // this is the latest addition
// const VideoBackground = () => {
//   return (
//     <div className="relative h-screen">
//       <video
//         src="/lights.mp4"
//         autoPlay
//         muted
//         loop
//         className="absolute top-0 left-0 h-full w-full object-cover"
//       ></video>
//       {/* <div className="absolute inset-0 bg-gray-900 opacity-20"></div> */}
//     </div>
//   );
// };

// const DisplayHome = ({ movies }) => {
//   const movieImages = movies.map((movie) => movie.poster);

//   return (
//     <div className="relative">
//       <VideoBackground />
//       <div className="absolute top-0 left-0 w-full h-full">
//         <div className="flex flex-col items-center justify-center h-full">
//           <h1 className="text-white lg:mt-16 text-center text-4xl py-10 font-bold uppercase tracking-wider">
//             Current Movies Screening
//           </h1>
//           <div className="mt-6 2xl:h-5/8 2xl:w-4/6 3xl:w-4/6 xl:w-6/6 lg:w-5/6 sm:w-full object-cover uppercase tracking-wider">
//             <Slideshow images={movieImages} />
//           </div>
//           <Link href="/GalleryScreen">
//             <button className="sm:mt-6 md:mt-12 lg:mb-20 xl:mt-18 2xl:mt-22 bg-amber-300 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded">
//               View all Movies
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DisplayHome;
