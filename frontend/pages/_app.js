import Layout from "../components/Layout";
import { useState } from "react";
import { Context } from "../store/context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    <Context.Provider value={[currentUser, setCurrentUser]}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Context.Provider>
  );
}

export default MyApp;
