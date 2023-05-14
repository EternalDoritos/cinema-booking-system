import React from "react";
import { useContext } from "react";
import { Context } from "../../store/context";
import { useState, useEffect } from "react";


const DisplayLoyalty = () => {
  const [currentUser, setCurrentUser] = useContext(Context);

  return (
    <div>
    {!currentUser && (
      <h1> There's no user information to display</h1>
    )}
    {currentUser && (
    <div>
    <label>View loyalty</label>
    <div> User Name: {currentUser.username}</div>
    <div> User Type: {currentUser.userType} </div>
    <div> Loyalty Points: {currentUser.loyaltyPoints}</div>
    </div>
    )} 
    </div>
  )
};

export default DisplayLoyalty;
