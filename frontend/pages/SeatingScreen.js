// const DisplaySeating = () => {
//   return <div>SeatingScreen</div>;
// };

// export default DisplaySeating;
// import Head from "next/head";

// export default function DisplaySeating() {
//   return (
//     <div>
//       <Head>
//         <title>Cinema Seating Plan</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <header className="bg-gray-900 py-4">
//         <h1 className="text-white text-center text-2xl font-bold">
//           Cinema Seating Plan
//         </h1>
//       </header>

//       <main className="container mx-auto mt-4">
//         <div className="grid grid-cols-5 gap-2">
//           {/* Row 1 */}
//           <div className="bg-gray-200 p-2 border border-gray-300">
//             1A
//             <span className="block text-sm text-gray-400">Reserved</span>
//           </div>
//           <div className="bg-gray-200 p-2 border border-gray-300">
//             1B
//             <span className="block text-sm text-gray-400">Reserved</span>
//           </div>
//           <div className="bg-green-400 p-2 border border-gray-300">
//             1C
//             <span className="block text-sm text-gray-800">Available</span>
//           </div>
//           <div className="bg-green-400 p-2 border border-gray-300">
//             1D
//             <span className="block text-sm text-gray-800">Available</span>
//           </div>
//           <div className="bg-green-400 p-2 border border-gray-300">
//             1E
//             <span className="block text-sm text-gray-800">Available</span>
//           </div>
//           <div className="bg-gray-200 p-2 border border-gray-300">
//             2A
//             <span className="block text-sm text-gray-400">Reserved</span>
//           </div>
//           <div className="bg-gray-200 p-2 border border-gray-300">
//             2B
//             <span className="block text-sm text-gray-400">Reserved</span>
//           </div>
//           <div className="bg-green-400 p-2 border border-gray-300">
//             2C
//             <span className="block text-sm text-gray-800">Available</span>
//           </div>
//           <div className="bg-green-400 p-2 border border-gray-300">
//             2D
//             <span className="block text-sm text-gray-800">Available</span>
//           </div>
//           <div className="bg-green-400 p-2 border border-gray-300">
//             2E
//             <span className="block text-sm text-gray-800">Available</span>
//           </div>
//           <div className="bg-gray-200 p-2 border border-gray-300">
//             3A
//             <span className="block text-sm text-gray-400">Reserved</span>
//           </div>
//           <div className="bg-gray-200 p-2 border border-gray-300">
//             3B
//             <span className="block text-sm text-gray-400">Reserved</span>
//           </div>
//           <div className="bg-green-400 p-2 border border-gray-300">
//             3C
//             <span className="block text-sm text-gray-800">Available</span>
//           </div>
//           <div className="bg-green-400 p-2 border border-gray-300">
//             3D
//             <span className="block text-sm text-gray-800">Available</span>
//           </div>
//           <div className="bg-green-400 p-2 border border-gray-300">
//             3E
//             <span className="block text-sm text-gray-800">Available</span>
//           </div>
//           {/* Rows 2-9 */}
//           {/* ... */}
//           {/* Row 10 */}
//           <div className="bg-green-400 p-2 border border-gray-300">
//             4A
//             <span className="block text-sm text-gray-800">Available</span>
//           </div>
//           <div className="bg-green-400 p-2 border border-gray-300">
//             4B
//             <span className="block text-sm text-gray-800">Available</span>
//           </div>
//           <div className="bg-yellow-400 p-2 border border-gray-300">
//             4C
//             <span className="block text-sm text-gray-800">Wheelchair</span>
//           </div>
//           <div className="bg-yellow-400 p-2 border border-gray-300">
//             4D
//             <span className="block text-sm text-gray-800">Wheelchair</span>
//           </div>
//           <div className="bg-green-400 p-2 border border-gray-300">
//             4E
//             <span className="block text-sm text-gray-800">Available</span>
//           </div>
//           <div className="bg-green-400 p-2 border border-gray-300">
//             5A
//             <span className="block text-sm text-gray-800">Available</span>
//           </div>
//           <div className="bg-green-400 p-2 border border-gray-300">
//             5B
//             <span className="block text-sm text-gray-800">Available</span>
//           </div>
//           <div className="bg-yellow-400 p-2 border border-gray-300">
//             5C
//             <span className="block text-sm text-gray-800">Wheelchair</span>
//           </div>
//           <div className="bg-yellow-400 p-2 border border-gray-300">
//             5D
//             <span className="block text-sm text-gray-800">Wheelchair</span>
//           </div>
//           <div className="bg-green-400 p-2 border border-gray-300">
//             5E
//             <span className="block text-sm text-gray-800">Available</span>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
// import { useState } from "react";

// export default function CinemaSeatingPlan() {
//   const [seats, setSeats] = useState([
//     { id: "1A", status: "reserved" },
//     { id: "1B", status: "reserved" },
//     { id: "1C", status: "available" },
//     { id: "1D", status: "available" },
//     { id: "1E", status: "available" },
//     { id: "2A", status: "available" },
//     { id: "2B", status: "available" },
//     { id: "2C", status: "available" },
//     { id: "2D", status: "available" },
//     { id: "2E", status: "available" },
//     // ...
//   ]);

//   const handleClick = (seatId) => {
//     const newSeats = seats.map((seat) => {
//       if (seat.id === seatId) {
//         return { ...seat, status: "selected" };
//       }
//       return seat;
//     });
//     setSeats(newSeats);
//   };

//   return (
//     <main className="container mx-auto mt-4">
//       <div className="grid grid-cols-10 gap-2">
//         {/* Rows 1-10 */}
//         {seats.map((seat) => (
//           <div
//             key={seat.id}
//             className={`p-2 border border-gray-300 ${
//               seat.status === "reserved"
//                 ? "bg-gray-200 text-gray-400"
//                 : seat.status === "selected"
//                 ? "bg-blue-500 text-white"
//                 : "bg-green-400"
//             }`}
//             onClick={() => {
//               if (seat.status === "available") {
//                 handleClick(seat.id);
//               }
//             }}
//           >
//             {seat.id}
//             <span className="block text-sm">
//               {seat.status === "reserved" && "Reserved"}
//               {seat.status === "available" && "Available"}
//               {seat.status === "selected" && "Selected"}
//             </span>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

// current code
// import { useState } from "react";

// export default function CinemaSeatingPlan() {
//   const [seats, setSeats] = useState([
//     { id: "1A", status: "reserved" },
//     { id: "1B", status: "reserved" },
//     { id: "1C", status: "available" },
//     { id: "1D", status: "available" },
//     { id: "1E", status: "available" },
//     { id: "2A", status: "available" },
//     { id: "2B", status: "available" },
//     { id: "2C", status: "available" },
//     { id: "2D", status: "available" },
//     { id: "2E", status: "available" },
//     { id: "3A", status: "available", type: "wheelchair" },
//     { id: "3B", status: "available", type: "wheelchair" },
//     { id: "3C", status: "available", type: "wheelchair" },
//     { id: "3D", status: "available", type: "wheelchair" },
//     { id: "3E", status: "available", type: "wheelchair" },
//     // ...
//   ]);

//   const handleClick = (seatId) => {
//     const newSeats = seats.map((seat) => {
//       if (seat.id === seatId) {
//         return {
//           ...seat,
//           status: seat.status === "available" ? "selected" : "available",
//         };
//       }
//       return seat;
//     });
//     setSeats(newSeats);
//   };

//   return (
//     <main className="container mx-auto mt-4">
//       <div className="flex flex-col items-center">
//         <div className="h-20 w-full bg-gray-800 flex items-center justify-center text-white text-2xl font-bold mb-4">
//           Screen
//         </div>
//         <div className="grid grid-cols-5 gap-2">
//           {/* Rows 1-10 */}
//           {seats.map((seat) => (
//             <div
//               key={seat.id}
//               className={`p-2 border border-gray-300 ${
//                 seat.status === "reserved"
//                   ? "bg-gray-200 text-gray-400"
//                   : seat.status === "selected"
//                   ? "bg-blue-500 text-white"
//                   : seat.type === "wheelchair"
//                   ? "bg-yellow-500 text-white"
//                   : "bg-green-400"
//               }`}
//               onClick={() => {
//                 if (seat.status === "available" || seat.status === "selected") {
//                   handleClick(seat.id);
//                 }
//               }}
//             >
//               {seat.id}
//               {seat.type === "wheelchair" && (
//                 <span className="block text-sm">Wheelchair</span>
//               )}
//               <span className="block text-sm">
//                 {seat.status === "reserved" && "Reserved"}
//                 {seat.status === "available" && "Available"}
//                 {seat.status === "selected" &&
//                   (seat.type === "wheelchair" ? "Selected" : "Selected")}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }
//////////////////

// another test
import { useState } from "react";

export default function CinemaSeatingPlan() {
  const [seats, setSeats] = useState([
    { id: "1A", status: "reserved" },
    { id: "1B", status: "reserved" },
    { id: "1C", status: "available" },
    { id: "1D", status: "available" },
    { id: "1E", status: "available" },
    { id: "2A", status: "available" },
    { id: "2B", status: "available" },
    { id: "2C", status: "available" },
    { id: "2D", status: "available" },
    { id: "2E", status: "available" },
    { id: "3A", status: "available", type: "wheelchair" },
    { id: "3B", status: "available", type: "wheelchair" },
    { id: "3C", status: "available", type: "wheelchair" },
    { id: "3D", status: "available", type: "wheelchair" },
    { id: "3E", status: "available", type: "wheelchair" },
    // ...
  ]);

  const handleClick = (seatId) => {
    const newSeats = seats.map((seat) => {
      if (seat.id === seatId) {
        return {
          ...seat,
          status: seat.status === "available" ? "selected" : "available",
        };
      }
      return seat;
    });
    setSeats(newSeats);
  };

  return (
    <main className="container mx-auto mt-4">
      <div className="flex flex-col items-center">
        <div className="h-20 w-full bg-gray-800 flex items-center justify-center text-white text-2xl font-bold mb-4">
          Screen
        </div>
        <div className="grid grid-cols-5 gap-2">
          {/* Rows 1-10 */}
          {seats.map((seat) => (
            <div
              key={seat.id}
              className={`p-2 border border-gray-300 rounded-md cursor-pointer ${
                seat.status === "reserved"
                  ? "bg-gray-200 text-gray-400"
                  : seat.status === "selected"
                  ? "bg-blue-500 text-white"
                  : seat.type === "wheelchair"
                  ? "bg-yellow-500 text-white"
                  : "bg-green-400"
              }`}
              onClick={() => {
                if (seat.status === "available" || seat.status === "selected") {
                  handleClick(seat.id);
                }
              }}
            >
              <div className="flex justify-between items-center">
                <div>{seat.id}</div>
                {seat.type === "wheelchair" && (
                  <span className="bg-yellow-400 text-white text-xs py-1 px-2 rounded">
                    Wheelchair
                  </span>
                )}
              </div>
              <div className="text-xs mt-1">
                {seat.status === "reserved" && "Reserved"}
                {seat.status === "available" && "Available"}
                {seat.status === "selected" && "Selected"}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          {seats.filter((seat) => seat.status === "selected").length > 0 && (
            <div>
              <p>
                You have selected{" "}
                {seats.filter((seat) => seat.status === "selected").length}{" "}
                seats:
              </p>
              <ul>
                {seats
                  .filter((seat) => seat.status === "selected")
                  .map((seat) => (
                    <li key={seat.id}>{seat.id}</li>
                  ))}
              </ul>
              <p>
                Total price: ${" "}
                {seats.filter((seat) => seat.status === "selected").length * 10}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
