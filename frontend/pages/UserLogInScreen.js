import Head from "next/head";
import Link from "next/link";

export default function DisplayUserLogIn() {
  return (
    <div className=" bg-black flex flex-col justify-center py-6 sm:px-6 lg:px-8">
      <Head>
        <title>Log in</title>
      </Head>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* <img className="mx-auto h-12 w-auto" src="/logo.png" alt="Logo" /> */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Log in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-400"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember_me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember_me"
                  className="ml-2 block text-sm text-gray-400"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-gold-600 hover:text-amber-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={() => {
                  //send a post request, inside body that holds username and pw,
                  //send over, be does check and return result,
                  //Declare context
                  /*if(400){
                    display error messgae on log in (either pw/email)
                  }
                  else if(200){
                    -receive user object and save it as a context,
                    -if null, redirect to log in, else
                    -check userType from context,
                    -route to home page.
                    -route over to relevant user pages.
                  }
                  */
                }}
                className="w-full flex justify-center py-2 px-4 border border-transparent  shadow-sm text-sm  bg-amber-300 hover:bg-amber-500 text-black font-bold rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between">
            <div className="text-sm mt-6">
              <Link
                href="/UserSignUpScreen"
                className="font-medium text-gold-600 hover:text-amber-500"
              >
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// import Head from "next/head";
// import Link from "next/link";

// export default function Login() {
//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center">
//       <Head>
//         <title>Login | GoldenRizz</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Log in to your account
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6">
//           <div>
//             <label htmlFor="email" className="sr-only">
//               Email address
//             </label>
//             <input
//               id="email"
//               name="email"
//               type="email"
//               autoComplete="email"
//               required
//               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//               placeholder="Email address"
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="sr-only">
//               Password
//             </label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               autoComplete="current-password"
//               required
//               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//               placeholder="Password"
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Log in
//             </button>
//           </div>
//         </form>
//         <div className="flex items-center justify-between">
//           <div className="text-sm">
//             <Link
//               href="/signup"
//               className="font-medium text-indigo-600 hover:text-indigo-500"
//             >
//               Don't have an account? Sign up
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
