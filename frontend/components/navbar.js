import { useState } from "react";

function NavLink({ to, children }) {
  return (
    <a href={to} className={`mx-4`}>
      {children}
    </a>
  );
}

function MobileNav({ open, setOpen }) {
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
          Gallery
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
        <a
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 my-4"
          href="/UserLogInScreen"
          onClick={() =>
            setTimeout(() => {
              setOpen(!open);
            }, 100)
          }
        >
          Log in
        </a>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // function handleLogin() {
  //   // perform login logic
  //   setIsLoggedIn(true);
  // }
  return (
    <nav className="flex filter drop-shadow-md bg-black px-4 py-4 h-20 items-center border-b-2 border-amber-300">
      <MobileNav open={open} setOpen={setOpen} />
      <div className="w-3/12 flex items-center">
        <a className="text-2xl font-semibold" href="/">
          GOLDENRIZZ
        </a>
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
          <NavLink to="/GalleryScreen">GALLERY</NavLink>
          {/* {isLoggedIn ? (
            <img src="/user-icon.png" alt="User Icon" />
          ) : (
            <button onClick={handleLogin}>Log In</button>
          )} */}
          <NavLink to="/UserLogInScreen">LOG IN</NavLink>
        </div>
      </div>
    </nav>
  );
}
