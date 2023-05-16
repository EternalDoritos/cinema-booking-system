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

  const calculatePrice = () => {
    const pricePerSeat = currentUser.customerType === 'adult' ? 10 : 12;
    return selectedSeats.length * pricePerSeat;
  };

  const getSeatLabel = (index) => {
    const rowNumber = Math.floor(index / 5) + 1;
    const columnNumber = (index % 5) + 1;
    const rowLabel = String.fromCharCode(65 + rowNumber - 1); // A = 65 in ASCII
    return `${rowLabel}${columnNumber}`;
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
              : getSeatLabel(index)}
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
        {selectedSeats.length > 0 && (
          <div className="mt-4">
            <p>
              You have selected: {selectedSeats.map((seatIndex) => getSeatLabel(seatIndex)).join(", ")}
            </p>
            <p>
              Price: ${calculatePrice()}
            </p>
          </div>
        )}
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
