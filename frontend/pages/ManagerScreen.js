import Head from "next/head";
import Link from "next/link";

//have yet to add functionality on CRUD of cinema and add movie listing
const ManagerScreen = () => {
  return (
    <div>
      <Head>
        <title>ManagerScreen</title>
      </Head>
      <h1 className="text-white text-center text-4xl py-10 font-bold uppercase tracking-wider">
        Manager Profile
      </h1>
      <div>
        <ul className="m-5 text-center ">
          <li>
            <Link legacyBehavior href="/managerComponents/report/report">
              <a className="text-center font-bold text-2xl">
                {" "}
                Generate Sales Report{" "}
              </a>
            </Link>
          </li>

          <li>
            <Link legacyBehavior href="/managerComponents/movie/editMovie">
              <a className="text-center font-bold text-2xl  p-2 rounded">
                {" "}
                Edit Movie Details{" "}
              </a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/managerComponents/food/editFood">
              <a className="text-center font-bold text-2xl  p-2 rounded">
                {" "}
                Edit Food Details{" "}
              </a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/managerComponents/cinema/editCinema">
              <a className="text-center font-bold text-2xl  p-2 rounded">
                {" "}
                Edit Cinema Details{" "}
              </a>
            </Link>
          </li>
          <li>
            <Link legacyBehavior href="/managerComponents/addListing">
              <a className="text-center font-bold text-2xl  p-2 rounded">
                {" "}
                Add Movie Listing{" "}
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ManagerScreen;
