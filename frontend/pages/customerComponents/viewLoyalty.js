// import React from "react";
// import { useContext } from "react";
// import { Context } from "../../store/context";
// import { useState, useEffect } from "react";
// import Head from "next/head";
// import Image from "next/image";

// const DisplayLoyalty = () => {
//   const [currentUser, setCurrentUser] = useContext(Context);

//   return (
//     <div>
//       <Head>
//         <title>View Loyalty Points</title>
//       </Head>
//       {!currentUser && (
//         <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wide">
//           {" "}
//           There's no user information to display
//         </h1>
//       )}
//       {currentUser && (
//         <div className="text-center">
//           <label className="text-white  text-4xl py-10 font-bold uppercase tracking-wider">
//             View loyalty
//           </label>
//           <div className="mt-10 font-bold text-2xl underline"> User Name</div>
//           <div className="text-2xl">{currentUser.username}</div>
//           <div className="mt-6 font-bold text-2xl underline"> User Type</div>
//           <div className="text-2xl">{currentUser.userType}</div>
//           <div className="mt-6 font-bold text-2xl underline">
//             {" "}
//             Loyalty Points
//           </div>
//           <div className="text-2xl">{currentUser.loyaltyPoints}</div>
//         </div>
//       )}
//       <div className="flex justify-center items-center mt-6">
//         <div className="w-94">
//           <Image
//             src="/poster.png"
//             alt="GoldenRizz Poster"
//             width={400}
//             height={500}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DisplayLoyalty;
import React from "react";
import { useContext } from "react";
import { Context } from "../../store/context";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

const DisplayLoyalty = () => {
  const [currentUser, setCurrentUser] = useContext(Context);

  return (
    <div className="bg-gray-800 min-h-screen py-8">
      <Head>
        <title>View Loyalty Points</title>
      </Head>
      {!currentUser && (
        <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wide">
          There's no user information to display
        </h1>
      )}
      {currentUser && (
        <div className="text-center">
          <label className="text-white text-4xl py-10 font-bold uppercase tracking-wider">
            loyalty points
          </label>
          <div className="mt-10 font-bold text-2xl underline"> User Name</div>
          <div className="text-2xl text-amber-300">{currentUser.username}</div>
          <div className="mt-6 font-bold text-2xl underline"> User Type</div>
          <div className="text-2xl text-amber-300">{currentUser.userType}</div>
          <div className="mt-6 font-bold text-2xl underline">
            Loyalty Points
          </div>
          <div className="text-2xl text-amber-300">
            {currentUser.loyaltyPoints}
          </div>
        </div>
      )}
      <div className="flex justify-center items-center mt-6">
        <div className="w-94">
          <Image
            src="/poster.png"
            alt="GoldenRizz Poster"
            width={400}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayLoyalty;
