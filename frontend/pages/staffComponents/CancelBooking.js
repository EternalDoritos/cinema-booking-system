import React, { useState } from "react";
import { useRouter } from "next/router";

export const getStaticProps = async () => {
  const [moviesRes, bookingsRes] = await Promise.all([
    fetch("http://localhost:5000/movie"),
    fetch("http://localhost:5000/listing"),
  ]);
  const [movies, bookings] = await Promise.all([
    moviesRes.json(),
    bookingsRes.json(),
  ]);

  return {
    props: { movies, bookings },
  };
};

const CancelBooking = ({ movies, bookings }) => {
  //const [setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  //const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState("");
  const router = useRouter();

  const handleMovieChange = (e) => {
    const movieId = e.target.value;
    setSelectedMovie(movieId);
    //const staticBookings = movies;
    //setBookings(staticBookings);
  };

  const handleBookingChange = (e) => {
    const bookingId = e.target.value;
    setSelectedBooking(bookingId);
  };

  const handleCancel = async (e) => {
    try {
      const response = await fetch("http://localhost:5000/listing", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedBooking,
        }),
      });

      if (response.status == 200) {
        window.alert("Booking cancelled successfully");
      } else {
        window.alert("Failed to cancel booking. Please try again later.");
      }
    } catch (error) {
      //console.error(error);
      window.alert("An error occurred while cancelling the booking.");
    }
  };

  return (
    <div>
      <h1 className="text-center m-4 text-bold text-4xl">Cancel Booking</h1>
      <div className="text-center flex flex-col m-4">
        <form>
          <label>
            Select a movie:
            <select
              value={selectedMovie}
              onChange={handleMovieChange}
              style={{ color: "#000" }}
            >
              <option value="">Select a movie</option>
              {movies.map((movie) => (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label>
            Select a booking to cancel:
            <select
              value={selectedBooking}
              onChange={handleBookingChange}
              style={{ color: "#000" }}
            >
              <option value="">Select a booking</option>
              {bookings
                ?.filter((booking) => booking.movie == selectedMovie)
                .map((booking) => (
                  <option key={booking._id} value={booking._id}>
                    {booking.date} - {booking.time}
                  </option>
                ))}
            </select>
          </label>
          <br />
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded"
            onClick={handleCancel}
          >
            Cancel booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default CancelBooking;
