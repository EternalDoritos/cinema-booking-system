import React, { useEffect } from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";
export async function getServerSideProps(context) {
  const pid = context.params.slug;
  // console.log(pid);
  const res = await fetch(
    `http://localhost:5000/auth/getUserByUsername/${pid}`
  );
  const data = await res.json();
  return {
    props: {
      user: data,
    },
  };
}
const Signup = ({ user }) => {
  console.log("User ID: ", user?._id);
  // let userToEdit = {
  //   username: user.username,
  // };
  // const [username, setUsername] = useState(`{userToEdit?.username}`);

  return <div></div>;
};
export default Signup;
