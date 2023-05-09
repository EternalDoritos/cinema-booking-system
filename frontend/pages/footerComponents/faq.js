import Head from "next/head";

export default function FAQPage() {
  return (
    <div>
      <Head>
        <title>FAQ - My Site</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className=" text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-4">General Questions</h2>

        <div className="border-t border-gray-300 pt-4">
          <h3 className="text-lg font-bold mb-2">
            What is this website about?
          </h3>
          <p className="text-gray-300 mb-4">
            This website is all about helping people purchase movie tickets
            online.
          </p>
        </div>

        <div className="border-t border-gray-300 pt-4">
          <h3 className="text-lg font-bold mb-2">How can I book a movie?</h3>
          <p className="text-gray-300 mb-4">
            You can book a movie by logging in and then clicking on "Gallery" to
            choose the movie that you want to watch. Click on a location and
            timing and choose your seating arrangement.
          </p>
        </div>

        <div className="border-t border-gray-300 pt-4">
          <h3 className="text-lg font-bold mb-2">
            How do I contact GoldenRizz?
          </h3>
          <p className="text-gray-300 mb-4">
            Feel free to click on "Contact Us" located at the bottom of the
            screen.
          </p>
        </div>
      </main>
    </div>
  );
}
