import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { Context } from "../store/context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const user = sessionStorage.getItem("userId");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);
  return (
    <Context.Provider value={[currentUser, setCurrentUser]}>
      <Layout>
        {console.log(currentUser)}
        <Component {...pageProps} />
      </Layout>
    </Context.Provider>
  );
}

export default MyApp;
