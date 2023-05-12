import React, {useState} from "react";
import { useRouter } from "next/router";

export const getStaticProps = async () => {
  const [moviesRes, cinemaRes] = await Promise.all([
    fetch("http://localhost:5000/movie"),
    fetch("http://localhost:5000/cinema"),
  ]);
  const [movies, cinemas] = await Promise.all([moviesRes.json(), cinemaRes.json()]);

  return {
    props: { movies, cinemas },
  };
};

const CreateBooking = ({movies, cinemas}) => {
  //const [setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  //const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState();

  const dates = ["2023-05-24", "2022-07-25", "2022-06-26", "2023-05-29", "2022-07-27", "2022-06-28"];
  const times = [1000, 1400, 1800, 1200, 1300, 1430, 1730];

  
  const handleMovieChange = (e) => {
    const movieId = e.target.value;
    setSelectedMovie(movieId);
    //const staticBookings = movies;
    //setBookings(staticBookings);
  }

  const handleBookingChange = (e) => {
    const bookingId = e.target.value;
    setSelectedBooking(bookingId);
  }

  const handleCinemaChange = (e) => {
    const cinemaId = e.target.value;
    setSelectedCinema(cinemaId);
  }
  const handleDateChange = (e) => {
    const dateId = e.target.value;
    setSelectedDate(dateId);
  }

  const handleTimeChange = (e) => {
    const timeId = e.target.value;
    setSelectedTime(timeId);
  }

  const handleCreation= async () => {
    const createBooking = await fetch("http://localhost:5000/listing", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cinema: selectedCinema,
        time: selectedTime,
        date: selectedDate,
        movie: selectedMovie,
      }),
    });
    console.log(createBooking.status);
    const router = useRouter();
    if (createBooking.status == 200) {
        router.push("/");
    } else {
        window.alert("This booking cannot be placed");
    }
    //console.log(`Cancelled booking with ID ${selectedBooking}`);
    //router.push("/staffComponents/CancelConfirmation");
  }

  return (
    <div>
      <h1 className="text-center m-4 text-bold text-4xl">Create Booking</h1>
      <div className="text-center flex flex-col m-4"><form>
        <label>
          Select a movie:
          <select value={selectedMovie} onChange={handleMovieChange}>
            <option value="">Select a movie</option>
            {movies.map(movie => (
              <option key={movie._id} value={movie._id}>{movie.title}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Select a cinema:
          <select value={selectedCinema} onChange={handleCinemaChange}>
            <option value="">Select a cinema</option>
            {cinemas?.map(cinema => (
              <option key={cinema._id} value={cinema._id}>{cinema.location} - {cinema.maxSeating}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Select Date:
          <select value={selectedDate} onChange={handleDateChange}>
            <option value="">Select a date</option>
            {dates?.map(date => (
              <option>{date}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Select Timing:
          <select value={selectedTime} onChange={handleTimeChange}>
            <option value="">Select a date</option>
            {times?.map(time => (
              <option>{time}</option>
            ))}
          </select>
        </label>
        <br />
        <button className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded" 
        onClick={handleCreation}>Place booking</button>
      </form>
      </div>
    </div>
  );
}

export default CreateBooking;
