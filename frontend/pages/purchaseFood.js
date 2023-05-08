import React, {useState} from "react";
import Head from "next/head";
import { useRouter } from "next/router";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/food");
  const data = await res.json();

  return {
    props: { foods: data },
  };
};

const purchaseFood = ({ foods }) => {
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const router = useRouter();
  
    const handleAdd = (food) => {
        const index = selectedFoods.findIndex((f) => f.id === food.id);
        if (index === -1) {
          const newSelectedFoods = [...selectedFoods, { ...food, count: 1 }];
          setSelectedFoods(newSelectedFoods);
        } else {
          const updatedSelectedFoods = [...selectedFoods];
          updatedSelectedFoods[index].count++;
          setSelectedFoods(updatedSelectedFoods);
        }
        setTotalCost((prevTotalCost) => prevTotalCost + food.price);
      };
      
      
      const handleRemove = (food) => {
        const index = selectedFoods.findIndex((f) => f.id === food.id);
        if (index === -1) {
          return;
        }
        const updatedSelectedFoods = selectedFoods.map((f) => {
          if (f.id === food.id) {
            return { ...f, count: f.count - 1 };
          } else {
            return f;
          }
        }).filter((f) => f.count > 0);
        setSelectedFoods(updatedSelectedFoods);
        setTotalCost((prevTotalCost) => prevTotalCost - food.price);
      };

      const selection = (food) => {
    
      };
      
      
      
      
      
  //const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/PurchaseScreen");
  };

  //const totalCost = selectedFoods.reduce((acc, foodId) => {
    //const selectedFood = foods.find((food) => food.id === foodId);
    //if (selectedFood) {
      //r//eturn acc + selectedFood.price;
   // } else {
  //    return acc;
//    }
  //}, 0);
  

  return (
    <div className="flex flex-col items-center">
      <Head>
        <title>Food and Beverage Menu Available</title>
      </Head>
      <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wider">
        Food and Beverage
      </h1>
      <div className="mb-8 ml-12 mr-12 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-black border-8 border-black">
        {foods.map((food) => (
          <div
            key={food.id}
            className="bg-gray-800 rounded-lg p-4 cursor-pointer"
          >
            <div className="card relative">
              <div className="bg-black-300 flex items-center justify-center">
                <img
                  className="object-cover h-400 w-450 lg:h-70 xl:w-96"
                  src={food.image}
                  alt={food.name}
                />
              </div>
              <div className="m-4">
                <h3 className="text-lg font-bold mb-2 text-white">
                  {food.name}
                </h3>
                <p className="text-sm text-gray-400">{food.price}</p>
                <div className="flex items-center justify-center">
                <button
                    className="text-white bg-gray-2000 rounded-l-lg px- py-1"
                    onClick={() => handleAdd(food)}
                    value={food.id}
                    checked={selectedFoods[food.id] > 0}
                  >
                    +
                  </button>
                  {/* this should update when qty changes
                  <p className="text-white text-center mx-2">
                    {selectedFoods.filter((f) => f.id === food.id)[0]?.count ||
                      0}
                    </p>*/}
                    <p className="text-white text-center mx-2">0</p>
                  <button
                    className="text-white bg-gray-2000 rounded-r-lg px-2 py-1"
                    onClick={() => handleRemove(food)}
                    value={food.id}
                    checked={selectedFoods[food.id] > 0}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-white">
        <p>Total Cost: ${totalCost}</p>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default purchaseFood;
