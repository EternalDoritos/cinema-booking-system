import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const UpdateFood = () => {
  const [name, setName] = useState(null);
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;

    const foodId = router.query.foodId;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/food/${foodId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [router.isReady, router.query.foodId]);

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const priceChange = (e) => {
    setPrice(e.target.value);
  };

  const imageChange = (e) => {
    setImage(e.target.value);
  };

  const updateFood = async () => {
    const createFood = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/food/`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: router.query.foodId,
        name,
        price,
        image,
      }),
    });
    if (createFood.status === 200) {
      window.alert("Food Updated successfully");
      router.push("/");
    } else window.alert("Error Updating food");
  };
  return (
    <>
      <Head>
        <title>Update Food</title>
      </Head>
      <h1 className="text-center text-4xl text-bold m-4">
        Update Food Listing
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
          onClick={updateFood}
        >
          Update Food
        </button>
      </div>
    </>
  );
};

export default UpdateFood;
