import React from "react";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/food");
  const data = await res.json();

  return {
    props: { food: data },
  };
};

const EditFood = ({ food }) => {
  const [foodIdUpdate, setFoodIdUpdate] = useState(null);
  const [foodIdDelete, setFoodIdDelete] = useState(null);
  const [update, setUpdate] = useState(false);
  const [deleteEle, setDeleteEle] = useState(false);
  const router = useRouter();
  const handleEventCategory = (e) => {
    setFoodIdUpdate(e.target.value);
  };

  const handleEventCategoryDelete = (e) => {
    setFoodIdDelete(e.target.value);
  };

  const createFood = () => {
    router.push("./createFood");
  };

  const updateFood = () => {
    router.push(`/managerComponents/food/updateFood?foodId=${foodIdUpdate}`);
  };

  const deleteFood = async () => {
    const deleteFood = await fetch("http://localhost:5000/food", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "applications.json",
      },
      body: JSON.stringify({
        id: foodIdDelete,
      }),
    });
    if (deleteFood.status === 200) {
      window.alert("Food has been deleted");
      router.push("/");
    } else window.alert("Error deleting food");
  };

  return (
    <>
      <Head>
        <title>Edit Food</title>
      </Head>
      <h1 className="text-center m-4 text-bold text-4xl">Edit Food Page</h1>
      <div className="text-center flex flex-col m-4">
        <div>
          <button
            className="m-4 text-xl font-bold rounded-full bg-cyan-900 p-5 m-4"
            onClick={createFood}
          >
            Create New Food
          </button>
        </div>
        <div>
          <button
            className="m-4 text-xl font-bold rounded-full bg-cyan-900 p-5 m-4"
            onClick={() => {
              setUpdate((update) => !update);
            }}
          >
            Update Food
          </button>
          {update && (
            <div>
              <label for="food" className="m-2 text-2xl">
                Choose Food:{" "}
              </label>
              <select
                name="food"
                id="food"
                value={foodIdUpdate}
                onChange={handleEventCategory}
                className="text-black"
              >
                <option disabled selected value className="text-center">
                  -- select an option --
                </option>
                {food.map((food) => (
                  <option key={Math.random()} value={food._id}>
                    {food.name}
                  </option>
                ))}
              </select>
              <button
                className="m-2 text-l font-bold rounded-full bg-green-500 p-2 px-6 m-2"
                onClick={updateFood}
              >
                Update
              </button>
            </div>
          )}
        </div>
        <div>
          <button
            className="m-4 text-xl font-bold rounded-full bg-cyan-900 p-5 m-4"
            onClick={() => {
              setDeleteEle((deleteEle) => !deleteEle);
            }}
          >
            Delete Food
          </button>
          {deleteEle && (
            <div>
              <label for="food" className="m-2 text-2xl">
                Choose Food:{" "}
              </label>
              <select
                name="food"
                id="food"
                value={foodIdDelete}
                onChange={handleEventCategoryDelete}
                className="text-black"
              >
                <option disabled selected value className="text-center">
                  {" "}
                  -- select an option --{" "}
                </option>
                {food.map((food) => (
                  <option key={Math.random()} value={food._id}>
                    {food.name}
                  </option>
                ))}
              </select>
              <button
                className="m-2 text-l font-bold rounded-full bg-red-500 p-2 px-6 m-2"
                onClick={deleteFood}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditFood;
