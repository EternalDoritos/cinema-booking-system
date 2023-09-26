import React from "react";
import Link from "next/link";
import Head from "next/head";

export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cinema`);
  const data = await res.json();

  return {
    props: { cinema: data },
  };
};

const viewCinema = ({ cinema }) => {
  return (
    <div>
      <title>View Cinema</title>

      <h1 className="text-white text-center text-4xl py-10 font-bold">
        View Cinema
      </h1>
      <div>
        <div className="flex flex-col p-10 bg-white rounded-lg shadow-lg m-4">
          <div className="text-black grid grid-cols-2 text-center">
            <h2 className="text-bold text-3xl">Location</h2>
            <h2 className="text-bold text-3xl">Max Seating</h2>
          </div>
          {cinema.map((ele) => {
            return (
              <div
                key={ele._id}
                className="text-black grid grid-cols-2 text-center"
              >
                <h4>{ele.location}</h4>
                <h4>{ele.maxSeating}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default viewCinema;
