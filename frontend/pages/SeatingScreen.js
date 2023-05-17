import Head from "next/head";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Food from "./purchaseFood";
import { Context } from "../store/context";
import purchaseFood from "./purchaseFood";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/food");
  const data = await res.json();

  return {
    props: { foods: data },
  };
};

const CinemaSeatingPlan = ({ id, foods }) => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useContext(Context);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showFood, setShowFood] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [foodCost, setFoodCost] = useState(0);

  const purchaseTicket = async (e) => {
    e.preventDefault;
    const bookTicket = await fetch("http://localhost:5000/listing/seat", {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        booked: selectedSeats,
        id: router.query.listId,
        discountedPriceBooked:
          currentUser.customerType === "student" ||
          currentUser.customerType === "senior"
            ? selectedSeats.length
            : 0,
        userId: currentUser._id,
      }),
    });
    if (bookTicket.status === 200) {
      window.alert("Booking successful");
      if (currentUser == null) {
        router.push("/PurchaseScreen");
      } else if (currentUser.userType == "staff") {
        router.push("/staffComponents/ChoosePayment");
      } else {
        router.push("/PurchaseScreen");
      }
    } else window.alert("Error");
  };
  useEffect(() => {
    const id = router.query.listId;

    console.log("id", id);
    fetch(`http://localhost:5000/listing/listingById/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0].seating);
        setSeats(data[0].seating);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [router.query.listId, id]);

  const calculatePrice = (selectedSeats) => {
    const pricePerSeat =
      currentUser.customerType === "student" ||
      currentUser.customerType === "senior"
        ? 10
        : 12;
    const cost = selectedSeats.length * pricePerSeat;
    setTotalCost(cost);
  };

  const handleSeatClick = (index) => {
    if (!seats[index]) {
      const updatedSelectedSeats = selectedSeats.includes(index)
        ? selectedSeats.filter((seatIndex) => seatIndex !== index)
        : [...selectedSeats, index];
      setSelectedSeats(updatedSelectedSeats);
      calculatePrice(updatedSelectedSeats); // Recalculate the total cost with the updated selected seats
    }
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

  const handleFood = () => {
    setShowFood(true);
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
            <p className="text-center">
              You have selected:{" "}
              {selectedSeats
                .map((seatIndex) => getSeatLabel(seatIndex))
                .join(", ")}
            </p>
            <p className="text-center">Price: ${totalCost}</p>
            <span>
              <button
                className="mt-6 mb-6 bg-amber-300 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded"
                onClick={handleFood}
              >
                {!showFood && "Add Food And Drink"}
                {showFood && (
                  <Food
                    foods={foods}
                    totalCost={foodCost}
                    setTotalCost={setFoodCost}
                  />
                )}
              </button>
            </span>
          </div>
        )}
        <div className="text-center">
          <h2 className="text-center text-3xl m-4">
            {`Grand Total: ${foodCost + totalCost}`}
          </h2>
          <button
            class="mt-6 mb-6 mr-2 bg-amber-300 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded"
            onClick={purchaseTicket}
          >
            Make Payment
          </button>
        </div>
      </div>
    </main>
  );
};

export default CinemaSeatingPlan;
