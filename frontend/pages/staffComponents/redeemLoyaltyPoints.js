import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const RedeemLoyaltyPoints = () => {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [currLoyaltyPoints, setCurrLoyaltyPoints] = useState(0);
  const getUserByEmail = async () => {
    try {
      const getUser = await fetch(
        `http://localhost:5000/auth/getUserByEmail/${email}`
      );
      const data = await getUser.json();
      setId(data?._id);
      setCurrLoyaltyPoints(data?.loyaltyPoints);
    } catch (error) {
      console.log("Invalid email address")
    }
    
  };
  const deductPoints = () => {
    getUserByEmail();
    console.log(currLoyaltyPoints);
    console.log(id);
    currLoyaltyPoints -= 1000;
    console.log("Loyalty points after - 1000", currLoyaltyPoints);
    if (currLoyaltyPoints >= 0) {
      fetch(`http://localhost:5000/auth/editUser/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ loyaltyPoints: currLoyaltyPoints }),
      })
        .then((response) => response.json())
        .then((data) => {
          window.alert("1000 points redeemed!");
          console.log(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      window.alert("You do not have enough points to redeem a ticket!");
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Redeem Royalty Points</title>
      </Head>
      <h1 className="text-center text-4xl text-bold m-4">
        Loyalty Point Redemption
      </h1>
      <div className="m-4 text-center">
        <form className="flex flex-col">
          <div className="m-4 text-xl">
            <label for="title">Customer Email: </label>
            <input
              type="text"
              size={40}
              onChange={handleEmailChange}
              className="text-black"
            ></input>
          </div>
        </form>

        <button
          className="rounded-full bg-cyan-900 m-4 p-2 px-5 text-2xl"
          onClick={deductPoints}
        >
          Redeem
        </button>
      </div>
    </>
  );
};

export default RedeemLoyaltyPoints;
