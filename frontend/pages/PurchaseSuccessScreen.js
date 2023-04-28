import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router"; // used for redirecting
import Image from "next/image";
import Head from "next/head";

const DisplayPurchaseSuccess = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      // router.go(-1)
      // router.go(1)
      router.push("/");
    }, 3000);
  }, []);

  return (
    <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <Head>
        <title>Purchase Success</title>
      </Head>
      <div className="flex flex-col items-center ">
        <Image src="/404-tick.png" width={128} height={94} />
        <h1 className="mt-6 text-center text-3xl font-extrabold text-white uppercase">
          Payment successful
        </h1>

        <h2 className="text-amber-500 text-center mt-4 mb-2">
          Your payment has been accepted. You have earned __ loyalty points!
        </h2>
        <p className="text-gray-400 text-center mt-4 mb-2">
          Redirecting to the home page in a couple of seconds.
        </p>
      </div>
    </div>
  );
};

export default DisplayPurchaseSuccess;
