import MovieCard from "./MovieCard";

const MoviesList = ({ list, name }) => {
  return (
    <>
      <h2 className="text-3xl text-white font-semibold mb-10 px-8">{name}</h2>
      <div className="overflow-hidden">
        <div className="flex overflow-y-auto">
          {list?.map((movie) => (
            <MovieCard
              releaseDate={movie.release_date}
              id={movie.id}
              key={movie.id}
              poster={movie.poster_path}
              name={movie.original_title}
              rating={movie.vote_average}
              overview={movie.overview}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MoviesList;
