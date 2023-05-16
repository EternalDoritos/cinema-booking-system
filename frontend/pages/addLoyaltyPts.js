import React from "react";
import { useState } from "react";
import { Context } from "../store/context";
import { useContext } from "react";

const AddLoyaltyPoints = () => {
  const [currentUser, setCurrentUser] = useContext(Context);

  const addPoints = () => {
    const updatedUser = { ...currentUser };
    updatedUser.loyaltyPoints += 200;

    // Get the user's ID from the currentUser object
    const userId = updatedUser._id;

    // Make a PATCH request to update the loyalty points on the server
    fetch(`http://localhost:5000/auth/editUser/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ loyaltyPoints: updatedUser.loyaltyPoints }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server, if needed
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });

    setCurrentUser(updatedUser);
  };

  return (
    <div>
      <button
        className="px-4 py-2 rounded-md  bg-amber-300 hover:bg-amber-500 text-black font-bold focus:outline-none"
        onClick={addPoints}
      >
        Submit Payment
      </button>
    </div>
  );
};

export default AddLoyaltyPoints;
