import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const CreateFood = () => {
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);
  const router = useRouter();

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const priceChange = (e) => {
    setPrice(e.target.value);
  };

  const imageChange = (e) => {
    setImage(e.target.value);
  };

  const createFood = async () => {
    const createFood = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/food`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        image,
      }),
    });
    if (createFood.status === 200) {
      window.alert("Food created successfully");
      router.push("/");
    } else window.alert("Error creating food");
  };
  return (
    <>
      <Head>
        <title>Create Food</title>
      </Head>
      <h1 className="text-center text-4xl text-bold m-4">
        Create new Food Listing
      </h1>
      <div className="m-4 text-center">
        <form className="flex flex-col">
          <div className="m-4 text-xl">
            <label htmlFor="name">Food Name:</label>
            <input
              type="text"
              size={20}
              value={name}
              onChange={nameChange}
              className="text-black"
            ></input>
          </div>

          <div className="m-4 text-xl">
            <label htmlFor="name">Food Price:</label>
            <input
              type="text"
              size={20}
              value={price}
              onChange={priceChange}
              className="text-black"
            ></input>
          </div>

          <div className="m-4 text-xl">
            <label htmlFor="name">Food Image:</label>
            <input
              type="text"
              size={40}
              value={image}
              onChange={imageChange}
              className="text-black"
            ></input>
          </div>
        </form>
        <button
          className="rounded-full bg-cyan-900 m-4 p-2 px-5 text-2xl"
          onClick={createFood}
        >
          Create New Food
        </button>
      </div>
    </>
  );
};

export default CreateFood;
