import { useInView } from "react-intersection-observer";
import usePaginatedMovies from "../hooks/usePaginatedMovies";
import MovieCard from "./MovieCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MoviesList = ({ id, list, name }) => {
  const { ref, inView } = useInView();
  usePaginatedMovies(id, inView);

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
          <div className="w-2/6 md:w-1/6 flex-shrink-0 px-2 py-0" ref={ref}>
            <Skeleton
              count={1}
              enableAnimation={true}
              width={100 + "%"}
              height={335}
            />
            <Skeleton
              count={1}
              enableAnimation={true}
              width={100 + "%"}
              height={20}
            />
            <Skeleton
              count={1}
              enableAnimation={true}
              width={100 + "%"}
              height={16}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesList;
