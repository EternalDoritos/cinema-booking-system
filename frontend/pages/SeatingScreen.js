// // another test
// import { useState } from "react";
// import Link from "next/link";
// import Head from "next/head";
// import { useContext } from "react";
// import { useRouter } from "next/router";
// import { Context } from "../store/context";

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
//   const router = useRouter();

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

//   const handleWalkin = (e) => {
//     e.preventDefault();
//     if (currentUser == null) {
//       router.push("/PurchaseScreen")
//     }
//     else if (currentUser.userType == "staff") {
//       router.push("/staffComponents/ChoosePayment");
//     }
//     else {
//       router.push("/PurchaseScreen")
//     }
//   };

//   return (
//     <main className="container mx-auto mt-4">
//       <Head>
//         <title>Seating Plan</title>
//       </Head>
//       <div className="flex flex-col items-center">
//         <div className="h-20 w-full bg-gray-800 flex items-center justify-center text-white text-2xl font-bold mb-4">
//           Screen
//         </div>
//         <div className="grid grid-cols-5 gap-2">
//           {/* Rows 1-10 */}
//           {seats.map((seat) => (
//             <div
//               key={seat.id}
//               className={`p-2 border border-gray-300 rounded-md cursor-pointer ${
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
//               <div className="flex justify-between items-center">
//                 <div>{seat.id}</div>
//                 {seat.type === "wheelchair" && (
//                   <span className="bg-yellow-400 text-white text-xs py-1 px-2 rounded">
//                     Wheelchair
//                   </span>
//                 )}
//               </div>
//               <div className="text-xs mt-1">
//                 {seat.status === "reserved" && "Reserved"}
//                 {seat.status === "available" && "Available"}
//                 {seat.status === "selected" && "Selected"}
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="mt-4">
//           {seats.filter((seat) => seat.status === "selected").length > 0 && (
//             <div>
//               <p>
//                 You have selected{" "}
//                 {seats.filter((seat) => seat.status === "selected").length}{" "}
//                 seats:
//               </p>
//               <ul>
//                 {seats
//                   .filter((seat) => seat.status === "selected")
//                   .map((seat) => (
//                     <li key={seat.id}>{seat.id}</li>
//                   ))}
//               </ul>
//               <p>
//                 Total price: ${" "}
//                 {seats.filter((seat) => seat.status === "selected").length * 10}
//               </p>
//               <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
//                 <button class="mt-6 mb-6 mr-2 bg-amber-300 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded"
//                   onClick={handleWalkin}>
//                   Make Payment
//                 </button>
//                 {/* redirect to food purchasing page */}
//                 <Link href={"/purchaseFood"}>
//                   <button class="mt-6 mb-6 bg-amber-300 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded" >
//                     add food and drink
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }
// // missing food and drinks, ticket type (e.g student), photo id verification



import Head from "next/head";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Context } from "../store/context";

const CinemaSeatingPlan = ({ id }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useContext(Context);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const id = router.query.listId;

    console.log('id', id);
    fetch(`http://localhost:5000/listing/listingById/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].seating);
        setSeats(data[0].seating);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleSeatClick = (index) => {
    if (!seats[index]) {
      if (selectedSeats.includes(index)) {
        setSelectedSeats(selectedSeats.filter((seatIndex) => seatIndex !== index));
      } else {
        setSelectedSeats([...selectedSeats, index]);
      }
    }
  };

  const renderSeats = () => {
    return (
      <div className="grid grid-cols-5 gap-4">
        {seats.map((seat, index) => (
          <div
            key={index}
            className={`p-3 rounded-md ${
              seat
                ? "bg-gray-400 cursor-not-allowed"
                : selectedSeats.includes(index)
                ? "bg-blue-500 cursor-pointer"
                : "bg-gray-700 hover:bg-blue-500 cursor-pointer"
            }`}
            onClick={() => handleSeatClick(index)}
          >
            {seat
              ? "Reserved"
              : selectedSeats.includes(index)
              ? "Selected"
              : "Available"}
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="container mx-auto mt-4">
      <Head>
        <title>Seating Plan</title>
      </Head>
      <div className="flex flex-col items-center">
        <div className="h-20 w-full bg-gray-800 flex items-center justify-center text-white text-2xl font-bold mb-4">
          Screen
        </div>
        <div className="flex flex-wrap justify-center">{renderSeats()}</div>
        <div>
          {selectedSeats.length > 0 && (
            <p className="mt-4">
              You have selected: {selectedSeats.join(", ")}
            </p>
          )}
        </div>
        <span>
          <Link href="/PurchaseScreen">
            <button className="mt-6 mb-6 mr-2 bg-amber-300 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded">
              Make Payment
            </button>
          </Link>
          <Link href="/purchaseFood">
            <button className="mt-6 mb-6 bg-amber-300 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded">
              Add Food and Drink
            </button>
          </Link>
        </span>
      </div>
    </main>
  );
};

export default CinemaSeatingPlan;
