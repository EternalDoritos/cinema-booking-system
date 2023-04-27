import React from "react";
import "tailwindcss/tailwind.css";
import Link from "next/link";

const locations = ["Bishan", "Tampines", "Bedok", "Pasir Ris"];
const timings = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];

const MovieBookingPage = () => {
  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold">Movie Showtimes</h1>
      </div>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full divide-y">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                >
                  Locations
                </th>
                {timings.map((timing) => (
                  <th
                    key={timing}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
                  >
                    {timing}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {locations.map((location) => (
                <tr key={location}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {location}
                  </td>
                  {timings.map((timing) => (
                    <td key={timing} className="px-6 py-4 whitespace-nowrap">
                      <Link href={"/SeatingScreen"}>
                        <button className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                          Book Now
                        </button>
                      </Link>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MovieBookingPage;
