export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:5000/movie");
  const data = await res.json();

  const paths = data.map((movie) => {
    return {
      params: { id: movie._id.toString() },
    };
  });
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("http://localhost:5000/movie/" + id);
  const data = await res.json();

  return { props: { movie: data } };
};

const Details = ({ movie }) => {
  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.image}</p>
      <p>{movie.description}</p>
    </div>
  );
};

export default Details;
