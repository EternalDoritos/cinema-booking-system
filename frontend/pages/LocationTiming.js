// import Head from "next/head";
// import React from "react";
// import { useRouter } from "next/router";
// import "tailwindcss/tailwind.css";
// import Link from "next/link";
// import { useState, useEffect, useContext } from "react";
// import { Context } from "../store/context";

// const MovieBookingPage = ({ id }) => {
//   const router = useRouter();
//   const [currentUser, setCurrentUser] = useContext(Context);
//   const [timing, setTiming] = useState([]);

//   useEffect(() => {
//     async function getData() {
//       const id = router.query.movieId;
//       const res = await fetch(`http://localhost:5000/listing/${id}`);
//       setTiming(await res.json());
//     }
//     getData();
//   }, []);
//   return (
//     // <div className="min-h-screen ">
//     <div>
//       <Head>
//         <title>Movie Booking</title>
//       </Head>
//       <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold">Movie Showtimes</h1>
//         {!currentUser && (
//           <h1 className="text-center font-bold font-3xl text-red-600">
//             Please log in to book a ticket
//           </h1>
//         )}
//       </div>
//       {timing.length < 1 ? (
//         <h1 className="text-center m-4 text-3xl text-bold">
//           No timing available
//         </h1>
//       ) : (
//         <>
//           <div className="grid grid-cols-4 text-center">
//             <div>
//               <h4 className="text-bold text-xl">Location</h4>
//             </div>
//             <div>
//               <h4 className="text-bold text-xl">Date</h4>
//             </div>
//             <h4 className="text-bold text-xl">Time</h4>
//             <h4></h4>
//           </div>
//           {timing.map((ele) => {
//             return (
//               <div
//                 className="grid grid-cols-4 text-center m-4"
//                 key={Math.random()}
//               >
//                 <div>
//                   <h4>{ele.cinema.location}</h4>
//                 </div>
//                 <div>
//                   <h4>{ele.date}</h4>
//                 </div>
//                 <div>
//                   <h4>{ele.time}</h4>
//                 </div>
//                 {!currentUser && <> </>}
//                 {currentUser && (
//                   <Link
//                     href={`/SeatingScreen?listId=${ele.listId}`}
//                     className="bg-cyan-900"
//                   >
//                     Book Now
//                   </Link>
//                 )}
//               </div>
//             );
//           })}
//         </>
//       )}
//     </div>
//   );
// };

// export default MovieBookingPage;
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { Context } from "../store/context";

const MovieBookingPage = ({ id }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useContext(Context);
  const [timing, setTiming] = useState([]);

  useEffect(() => {
    async function getData() {
      const id = router.query.movieId;
      const res = await fetch(`http://localhost:5000/listing/${id}`);
      setTiming(await res.json());
    }
    getData();
  }, []);
  return (
    // <div className="min-h-screen ">
    <div>
      <Head>
        <title>Movie Booking</title>
      </Head>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Movie Showtimes</h1>
        {!currentUser && (
          <h1 className="text-center font-bold font-3xl text-red-600">
            Please log in to book a ticket
          </h1>
        )}
      </div>
      {timing.length < 1 ? (
        <h1 className="text-center m-4 text-3xl text-bold">
          No timing available
        </h1>
      ) : (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-800 py-4 px-4 shadow sm:rounded-lg sm:px-0">
              <div className="grid grid-cols-4 text-center">
                <div>
                  <h4 className="text-bold text-xl underline">Location</h4>
                </div>
                <div>
                  <h4 className="text-bold text-xl underline">Date</h4>
                </div>
                <h4 className="text-bold text-xl underline">Time</h4>
                <h4></h4>
              </div>
              {timing.map((ele) => {
                return (
                  <div
                    className="grid grid-cols-4 text-center m-4"
                    key={Math.random()}
                  >
                    <div>
                      <h4>{ele.cinema.location}</h4>
                    </div>
                    <div>
                      <h4>{ele.date}</h4>
                    </div>
                    <div>
                      <h4>{ele.time}</h4>
                    </div>
                    {!currentUser && <> </>}
                    {currentUser && (
                      <Link
                        href={`/SeatingScreen?listId=${ele.listId}`}
                        passHref
                      >
                        <a className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium py-1 px-2 rounded-lg text-sm transition-colors duration-300">
                          Book Now
                        </a>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieBookingPage;

// import Head from "next/head";
// import { useRouter } from "next/router";
// import { useState, useEffect, useContext } from "react";
// import Link from "next/link";
// import { Context } from "../store/context";

// const MovieBookingPage = ({ id }) => {
//   const router = useRouter();
//   const [currentUser, setCurrentUser] = useContext(Context);
//   const [timing, setTiming] = useState([]);

//   useEffect(() => {
//     async function getData() {
//       const id = router.query.movieId;
//       const res = await fetch(`http://localhost:5000/listing/${id}`);
//       setTiming(await res.json());
//     }
//     getData();
//   }, []);

//   return (
//     <div>
//       <Head>
//         <title>Movie Booking</title>
//       </Head>
//       <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold text-center">Movie Showtimes</h1>
//         {!currentUser && (
//           <h1 className="text-center font-bold text-3xl text-red-600 mt-4">
//             Please log in to book a ticket
//           </h1>
//         )}
//       </div>
//       {timing.length < 1 ? (
//         <h1 className="text-center m-4 text-3xl font-bold">
//           No timing available
//         </h1>
//       ) : (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="bg-gray-800 py-4 px-4 shadow sm:rounded-lg sm:px-0">
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-center">
//               <div>
//                 <h4 className="text-bold text-xl underline">Location</h4>
//               </div>
//               <div>
//                 <h4 className="text-bold text-xl underline">Date</h4>
//               </div>
//               <h4 className="text-bold text-xl underline">Time</h4>
//               <h4></h4>
//             </div>
//             {timing.map((ele) => {
//               return (
//                 <div
//                   className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-center m-4"
//                   key={Math.random()}
//                 >
//                   <div>
//                     <h4>{ele.cinema.location}</h4>
//                   </div>
//                   <div>
//                     <h4>{ele.date}</h4>
//                   </div>
//                   <div>
//                     <h4>{ele.time}</h4>
//                   </div>
//                   {!currentUser && <> </>}
//                   {currentUser && (
//                     <Link href={`/SeatingScreen?listId=${ele.listId}`} passHref>
//                       <a className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium py-1 px-2 rounded-lg text-sm transition-colors duration-300">
//                         Book Now
//                       </a>
//                     </Link>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MovieBookingPage;
