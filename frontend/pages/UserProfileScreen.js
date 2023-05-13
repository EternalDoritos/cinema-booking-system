import Head from "next/head";
import { Context } from "../store/context";
import { useContext } from "react";
import { useRouter } from "next/router";
import ManagerScreen from "./ManagerScreen";
const DisplayUserProfile = () => {
  const [currentUser, setCurrentUser] = useContext(Context);
  const router = useRouter();
  const logOut = () => {
    router.push("/");
    setCurrentUser(null);
    sessionStorage.removeItem("userId");
  };
  return (
    <div>
      <Head>
        <title>User Profile</title>
      </Head>
      {currentUser && currentUser.userType === "manager" && <ManagerScreen />}
      <div className="text-right m-4">
        <button className="m-4 p-2 bg-cyan-900" onClick={logOut}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DisplayUserProfile;
