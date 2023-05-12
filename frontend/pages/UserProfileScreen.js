import Head from "next/head";
import { Context } from "../store/context";
import { useContext } from "react";
import ManagerScreen from "./ManagerScreen";
const DisplayUserProfile = () => {
  const [currentUser] = useContext(Context);
  return (
    <div>
      <Head>
        <title>User Profile</title>
      </Head>
      {currentUser.userType === "manager" && <ManagerScreen />}
    </div>
  );
};

export default DisplayUserProfile;
