import Head from "next/head";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Context } from "../store/context";

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
  const [counters, setCounters] = useState(new Array(foods.length).fill(0));

  const purchaseTicket = async () => {
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
          currentUser.userType === "student" ||
          currentUser.userType === "senior"
            ? selectedSeats.length
            : 0,
        userId: currentUser._id,
      }),
    });
    if (bookTicket.status === 200) window.alert("Booking successful");
    else window.alert("Error");
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

  const calculatePrice = () => {
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

  const handleWalkin = (e) => {
    e.preventDefault();
    if (currentUser == null) {
      router.push("/PurchaseScreen");
    } else if (currentUser.userType == "staff") {
      router.push("/staffComponents/ChoosePayment");
    } else {
      router.push("/PurchaseScreen");
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
              : getSeatLabel(index)}
          </div>
        ))}
      </div>
    );
  };

  const handleIncrement = (index) => {
    const newCounters = [...counters];
    newCounters[index] += 1;
    setCounters(newCounters);
    setTotalCost((prevTotalCost) => prevTotalCost + foods[index].price);
  };

  const handleDecrement = (index) => {
    const newCounters = [...counters];
    if (newCounters[index] > 0) {
      newCounters[index] -= 1;
      setCounters(newCounters);
    }
    setTotalCost((prevTotalCost) => prevTotalCost - foods[index].price);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser == null) {
      router.push("/PurchaseScreen");
    } else if (currentUser.userType == "staff") {
      router.push("/staffComponents/ChoosePayment");
    } else {
      router.push("/PurchaseScreen");
    }
  };

  const handleFood = ()=> {
    setShowFood(true);
  }

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
              You have selected:{" "}
              {selectedSeats
                .map((seatIndex) => getSeatLabel(seatIndex))
                .join(", ")}
            </p>
            {!showFood && (<p>Price: ${totalCost}</p>)}
            <span>
            {!showFood && (<button class="mt-6 mb-6 mr-2 bg-amber-300 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded"
                onClick={handleWalkin}>
                Make Payment
              </button>)}
              <button className="mt-6 mb-6 bg-amber-300 hover:bg-amber-500 text-black font-bold py-2 px-4 rounded"
              onClick={handleFood}>
                {!showFood && ("Add Food And Drink")}
                {showFood && 
                (<div className="flex flex-col items-center">
                <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wider">
                  Food and Beverage
                </h1>
                <div className="mb-8 ml-12 mr-12 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-black border-8 border-black">
                  {foods.map((food, index) => (
                    <div
                      key={food.id}
                      className="bg-gray-800 rounded-lg p-4 cursor-pointer"
                    >
                      <div className="card relative">
                        <div className="bg-black-300 flex items-center justify-center">
                          <img
                            className="object-cover h-400 w-450 lg:h-70 xl:w-96"
                            src={food.image}
                            alt={food.name}
                          />
                        </div>
                        <div className="m-4">
                          <h3 className="text-lg font-bold mb-2 text-white">
                            {food.name}
                          </h3>
                          <p className="text-sm text-gray-400">{food.price}</p>
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() => handleDecrement(index)}
                              className="bg-yellow text-black font-bold py-2 px-4 rounded"
                            >
                              -
                            </button>
                            <span>{counters[index]}</span>
                            <button
                              onClick={() => handleIncrement(index)}
                              className="bg-yellow text-black font-bold py-2 px-4 rounded"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-white">
                  <p>Total Cost: ${Math.ceil(totalCost * 100) / 100}</p>
                </div>
                <button
                  onClick={handleSubmit}
                  className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded"
                >
                  Proceed to Payment
                </button>
              </div>)
                }
              </button>
            </span>
          </div>
        )}
      </div>
    </main>
  );
};

export default CinemaSeatingPlan;
