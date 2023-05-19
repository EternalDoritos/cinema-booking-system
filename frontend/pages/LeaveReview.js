import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Context } from "../store/context";

const EditReview = () => {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState();
  const [currentUser, setCurrentUser] = useContext(Context);
  const router = useRouter();

  const addReview = (e) => {
    setReview(e.target.value);
  };

  const addRating = (e) => {
    setRating(e.target.value);
  };

  const updateReview = async () => {
    try {
      if (!review || !rating) {
        alert("Please fill in all the required fields.");
        return;
      }
      if (rating < 0 || rating > 5) {
        alert("Rating must be between 0 and 5.");
        return;
      }

      const response = await fetch(`http://localhost:5000/movie/reviews`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: router.query.movieId,
          name: currentUser._id,
          reviews: review,
          ratings: rating,
        }),
      });

      const data = await response.json();
      console.log(data); // For debugging purposes only

      // Check if the update was successful
      if (response.ok) {
        console.log("Review updated successfully!");
        setName("");
        setReview("");
        setRating("");
        alert("Your review has been submitted!");
        window.location.reload(); // force page to reload
      } else {
        console.log("Failed to update review");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {/* {isSubmitted && <p>Your review has been submitted!</p>} */}
      {!currentUser && (
        <h1 className="text-red-500 text-center text-bold text-3xl">
          Please log in to leave review
        </h1>
      )}
      {currentUser && (
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="mb-4">
            <label
              htmlFor="review"
              className="block text-sm font-medium text-gray-400"
            >
              Review
            </label>
            <textarea
              id="review"
              name="review"
              value={review}
              onChange={addReview}
              placeholder="Enter your review"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-400"
            >
              Rating
            </label>
            <input
              type="number"
              id="rating"
              placeholder="Enter rating from 1-5"
              name="rating"
              min="1"
              max="5"
              value={rating}
              onChange={addRating}
              className="w-full px-3 py-2 placeholder-gray-400 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-black"
              required
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={updateReview}
              className="w-full flex justify-center py-2 px-4 border border-transparent  shadow-sm text-sm  bg-amber-300 hover:bg-amber-500 text-black font-bold rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default EditReview;
