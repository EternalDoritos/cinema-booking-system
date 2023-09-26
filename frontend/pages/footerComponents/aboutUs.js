import Head from "next/head";

const About = () => {
  return (
    <div className="bg-black ">
      <Head>
        <title>About Us</title>
      </Head>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-200 mb-4">
              GoldenRizz Multiplex Pte Ltd, a wholly-owned subsidiary of Orange
              Sky Rizz God Entertainment (Holdings), is Singapore&apos;s leading
              cinema exhibitor with 69 multiplexes, housing 96 screens, located
              at Bishan, Tampines, Bedok – home to Singapore&apos;s first
              all-laser cinema, and Pasir Ris. GoldenRizz is the first local
              cinema company to personalise the movie-going experience through
              its Movie Club program. Today, GoldenRizz has a reputation of
              offering the widest choice of movies, state-of-the-art design,
              convenience and unparalleled comfort, with all cinemas newly
              refurbished between 2010 to 2022.
            </p>
            <p className="text-gray-200">
              Established in 1969, GoldenRizz Pictures (GVP) is Singapore&apos;s
              leading independent film distributor, releasing a wide range of
              blockbusters from Hollywood&apos;s JOHN WICK series to Asian
              megahits like Director Yeon Sang-Ho&apos;s TRAIN TO BUSAN,
              PENINSULA; Jackie Chan&apos;s CZ12, KUNGFU YOGA; Andy Lau&apos;s
              SHOCK WAVE series, etc.
            </p>
          </div>
          <div className="md:w-1/2 md:order-last">
            <img
              src="/cinema.jpg"
              className="w-full h-auto md:h-full object-cover rounded-md md:rounded-none"
              alt="Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
