import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
const ChoosePayment = () => {
    const router = useRouter();
    const handleQR = (e) => {
        e.preventDefault();
        router.push("/staffComponents/Paynow");
    };

    const handleCash = (e) => {
        e.preventDefault();
        router.push("/PurchaseSuccessScreen");
    };
    
    return (
        <div  className="bg-black flex flex-col justify-center py-6 sm:px-6 lg:px-8">
            <Head>
                <title>Payment Method</title>
            </Head>
            <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wider">
                Choose Payment Method
            </h1>

            <div className="mb-8 ml-12 mr-12 mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 bg-black border-8 border-black">

                <div className="bg-gray-800 rounded-lg p-4 cursor-pointer">
                    <div className="card relative">
                        <div className="m-4">
                            <button onClick={handleQR}>
                                <h3 className="text-lg font-bold mb-2 text-white">
                                QR Payment
                                </h3>
                            </button>
                        </div>
                    </div>
                </div>
   
                <div className="bg-gray-800 rounded-lg p-4 cursor-pointer">
                    <div className="card relative">
                        <div className="m-4">
                            <button onClick={handleCash}>
                                <h3 className="text-lg font-bold mb-2 text-white">
                                Cash Payment
                                </h3>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChoosePayment;