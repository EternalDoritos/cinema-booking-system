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
      } else {
        console.log("Failed to update review");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <span> Name: </span>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={addName}
          className="text-black"
        />

        <span> Leave a review </span>
        <input
          type="text"
          placeholder="Review"
          value={review}
          onChange={addReview}
          className="text-black"
        />

        <span> Leave a rating </span>
        <input
          type="number"
          placeholder="0-5"
          value={rating}
          onChange={addRating}
          className="text-black"
        />

        <button onClick={updateReview}> Submit </button>
      </div>
    </>
  );
};

export default EditReview;
