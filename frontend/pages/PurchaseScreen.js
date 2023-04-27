// const DisplayPayment = () => {
//   return <div>DisplayPayment</div>;
// };

// export default DisplayPayment;
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

export default function DisplayPurchase() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleCardNameChange = (event) => {
    setCardName(event.target.value);
  };

  const handleCardExpirationChange = (event) => {
    setCardExpiration(event.target.value);
  };

  const handleCardCVVChange = (event) => {
    setCardCVV(event.target.value);
  };
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();

    router.push("/PurchaseSuccessScreen");

    // Handle payment submission logic here
  };

  return (
    <div className="bg-black flex flex-col justify-center py-6 sm:px-6 lg:px-8">
      <Head>
        <title>Purchase</title>
      </Head>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-white">
          Payment Details
        </h1>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="card-number"
                  className="block text-gray-400 font-bold mb-2"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="card-number"
                  name="card-number"
                  className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 text-black"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="Enter your card number"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="card-name"
                  className="block text-gray-400 font-bold mb-2"
                >
                  Cardholder Name
                </label>
                <input
                  type="text"
                  id="card-name"
                  name="card-name"
                  className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 text-black"
                  value={cardName}
                  onChange={handleCardNameChange}
                  placeholder="Enter your name as it appears on the card"
                  required
                />
              </div>
              <div className="mb-4 flex flex-row">
                <div className="w-1/2 mr-2">
                  <label
                    htmlFor="card-expiration"
                    className="block text-gray-400 font-bold mb-2"
                  >
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    id="card-expiration"
                    name="card-expiration"
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 text-black"
                    value={cardExpiration}
                    onChange={handleCardExpirationChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="w-1/2 ml-2">
                  <label
                    htmlFor="card-cvv"
                    className="block text-gray
            font-bold mb-2"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="card-cvv"
                    name="card-cvv"
                    className="w-full px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring focus:ring-indigo-500 focus:border-indigo-500 text-black"
                    value={cardCVV}
                    onChange={handleCardCVVChange}
                    placeholder="CVV"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                {/* <Link href="/PurchaseSuccessScreen"> */}
                <button
                  type="submit"
                  className=" px-4 py-2 rounded-md  bg-amber-300 hover:bg-amber-500 text-black font-bold focus:outline-none"
                >
                  Submit Payment
                </button>
                {/* </Link> */}
              </div>
            </form>
            {/* <p className="text-gray-700 text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="text-indigo-500">
            Sign up
          </Link>
        </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
