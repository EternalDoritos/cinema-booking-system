import Head from "next/head";
export const getStaticProps = async () => {
  const res = await fetch("http://localhost:5000/movie");
  const data = await res.json();

  return {
    props: { movies: data },
  };
};

const DisplayGallery = ({ movies }) => {
  return (
    <div>
      <h1 class="text-white text-center text-4xl pt-5"> Movie List</h1>
      <div class="mt-8 grid grid-cols-3 gap-10 bg-black">
        {movies.map((movies) => (
          <div key={movies.id} className="bg-gray rounded-lg p-4">
            <a>
              <div class="card">
                <div className="bg-black-300">
                  <img
                    className="object-fill h-70 w-96"
                    src={movies.image}
                    alt={movies.title}
                  />
                </div>
                <div class="m-4">
                  <h3 class="text-lg font-bold mb-2">{movies.title}</h3>
                  <span class="text-sm">{movies.description}</span>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayGallery;
