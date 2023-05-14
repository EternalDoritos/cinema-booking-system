import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const EditUser = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(`http://localhost:5000/auth/getUserById/64574d60f132becf123ddcf6`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //     });
  // }, []);

  console.log(data);
  return (
    <>
      <div>
        <h1 class="text-white text-center text-4xl pt-10 font-bold uppercase tracking-wider">
          System Admin Profile
        </h1>
        <h2 class="text-white text-center text-base pt-2 pb-10  tracking-wider">
          Edit User: {id}
        </h2>
        {/* {isLoading ? <p>Loading... </p> : null}
        {!data ? <p>No profile data</p> : null} */}
        <p>{data}</p>
        <form></form>
      </div>

      {/* Form or components for editing user */}
    </>
  );
};

export default EditUser;
