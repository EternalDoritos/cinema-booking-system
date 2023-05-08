// // REVIEW
// import React, { useState } from "react";

// const postReview = async (movieId, reviewData) => {
//   try {
//     const res = await fetch(`http://localhost:5000/movie/${movieId}/reviews`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(reviewData),
//     });
//     const result = await res.json();
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };

// const Review = (props) => {
//   const [review, setReview] = useState({reviews: "", rating: 0 });

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     postReview(props.movieId, review);
//     setReview({reviews: "", rating: 0 });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {/* <input
//         type="text"
//         placeholder="Your name"
//         value={review.name}
//         onChange={(e) => setReview({ ...review, name: e.target.value })}
//       /> */}
//       <input
//         type="text"
//         placeholder="Your review"
//         value={review.reviews}
//         onChange={(e) => setReview({ ...review, reviews: e.target.value })}
//       />
//       <input
//         type="number"
//         placeholder="Your rating"
//         value={review.rating}
//         onChange={(e) => setReview({ ...review, rating: parseInt(e.target.value) })}
//       />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default Review;

// // REVIEW

import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const EditReview = () => {
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState();
  // const [isSubmitted, setIsSubmitted] = useState(false);

  const router = useRouter();

  // useEffect(() => {
  //   const movieId = router.query.movieId;
  //   fetch(`http://localhost:5000/movie/reviews`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setName(data[0].name)
  //       setReview(data[0].review);
  //       setRating(data[0].rating);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [router.isReady]);

  const addName = (e) => {
    setName(e.target.value);
  };

  const addReview = (e) => {
    setReview(e.target.value);
  };

  const addRating = (e) => {
    setRating(e.target.value);
  };

  const updateReview = async () => {
    console.log(name);
    console.log(review);
    console.log(rating);
    console.log(router.query.movieId);
    try {
      const response = await fetch(`http://localhost:5000/movie/reviews`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: router.query.movieId,
          name: name,
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

      <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-400"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={addName}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            required
          />
        </div>
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
    </div>
  );
};
export default EditReview;
