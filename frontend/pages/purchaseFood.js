import React, {useState} from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Context } from "../store/context";
//import Counter from '../components/Counter';

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/food");
  const data = await res.json();

  return {
    props: { foods: data },
  };
};

const purchaseFood = ({ foods }) => {
    const [counters, setCounters] = useState(new Array(foods.length).fill(0));
    const [totalCost, setTotalCost] = useState(0);
    const router = useRouter();
  
    const handleIncrement = (index) => {
      const newCounters = [...counters];
      newCounters[index] += 1;
      setCounters(newCounters);
      setTotalCost((prevTotalCost) => prevTotalCost + foods[index].price);
    };
  
    const handleDecrement = (index) => {
      const newCounters = [...counters];
      if (newCounters[index] > 0) {
        newCounters[index] -= 1;
        setCounters(newCounters);
      }
      setTotalCost((prevTotalCost) => prevTotalCost - foods[index].price);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentUser == null) {
          router.push("/PurchaseScreen")
        }
        else if (currentUser.userType == "staff") {
          router.push("/staffComponents/ChoosePayment");
        }
        else {
          router.push("/PurchaseScreen")
        }
    };
  
    return (
    <div className="flex flex-col items-center">
    <Head>
        <title>Order Food and Beverage</title>
    </Head>
    <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wider">
        Food and Beverage
    </h1>
    <div className="mb-8 ml-12 mr-12 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-black border-8 border-black">
      
        {foods.map((food, index) => (
          <div key={food.id} className="bg-gray-800 rounded-lg p-4 cursor-pointer">
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
                    <button onClick={() => handleDecrement(index)} className="bg-yellow text-black font-bold py-2 px-4 rounded">-</button>
                        <span>{counters[index]}</span>
                    <button onClick={() => handleIncrement(index) } className="bg-yellow text-black font-bold py-2 px-4 rounded">+</button>
                    </div>
                </div>
            </div>
          </div>
        ))}
      
      </div>
      <div className="text-white">
        <p>Total Cost: ${Math.ceil(totalCost*100)/100}</p>
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