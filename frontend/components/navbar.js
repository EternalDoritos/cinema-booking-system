import { useState } from "react";
import { useContext } from "react";
import { Context } from "../store/context";
import UserProfile from "../pages/UserProfileScreen";
import { useRouter } from "next/router";
function NavLink({ to, children }) {
  return (
    <a href={to} className={`mx-4`}>
      {children}
    </a>
  );
}

function MobileNav({ open, setOpen }) {
  const [currentUser] = useContext(Context);

  return (
    <div
      className={`absolute top-0 left-0 h-screen w-screen bg-black transform ${
        open ? "-translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out filter drop-shadow-md `}
    >
      <div className="flex items-center justify-center filter drop-shadow-md bg-black h-20">
        {" "}
        {/*logo container*/}
        <a className="text-xl font-semibold" href="/">
          GOLDENRIZZ
        </a>
      </div>
      <div className="flex flex-col ml-4">
        <a
          className="text-xl font-medium my-4"
          href="/GalleryScreen"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          GALLERY
        </a>
        {/* <a
          className="text-xl font-medium my-4"
          href="/UserLogInScreen"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          Log in
        </a> */}
        {!currentUser && (
          <a
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 my-4"
            href="/UserLogInScreen"
            onClick={() =>
              setTimeout(() => {
                setOpen(!open);
              }, 100)
            }
          >
            LOG IN
          </a>
        )}
        {currentUser && (
          <a
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 my-4"
            href="/UserProfileScreen"
            onClick={() =>
              setTimeout(() => {
                setOpen(!open);
              }, 100)
            }
          >
            PROFILE
          </a>
        )}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [currentUser] = useContext(Context);
  const router = useRouter();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  //const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  // function handleLogin() {
  //   // perform login logic
  //   setIsLoggedIn(true);
  // }
  const userProfile = () => {
    router.push("/UserProfileScreen");
  };

  const gallery = () => {
    router.push("/GalleryScreen");
  };

  const index = () => {
    router.push("/");
  };

  const login = () => {
    router.push("/UserLogInScreen");
  };
  return (
    <nav className="flex filter drop-shadow-md bg-black px-4 py-4 h-20 items-center border-b-2 border-amber-300">
      <MobileNav open={open} setOpen={setOpen} />
      <div className="w-3/12 flex items-center">
        <button
          className="text-2xl font-semibold text-amber-300"
          onClick={index}
        >
          GOLDENRIZZ
        </button>
      </div>
      <div className="w-9/12 flex justify-end items-center">
        <div
          className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {/* hamburger button */}
          <span
            className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${
              open ? "rotate-45 translate-y-3.5" : ""
            }`}
          />
          <span
            className={`h-1 w-full bg-white rounded-lg transition-all duration-300 ease-in-out ${
              open ? "w-0" : "w-full"
            }`}
          />
          <span
            className={`h-1 w-full bg-white rounded-lg transform transition duration-300 ease-in-out ${
              open ? "-rotate-45 -translate-y-3.5" : ""
            }`}
          />
        </div>

        <div className="hidden md:flex">
          <button onClick={gallery} className="m-2 text-amber-300">
            GALLERY
          </button>
          {/* {isLoggedIn ? (
            <img src="/user-icon.png" alt="User Icon" />
          ) : (
            <button onClick={handleLogin}>Log In</button>
          )} */}
          {currentUser && (
            <button onClick={userProfile} className="m-2 text-amber-300">
              PROFILE
            </button>
          )}
          {!currentUser && (
            <button onClick={login} className="m-2 text-amber-300">
              LOG IN
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
