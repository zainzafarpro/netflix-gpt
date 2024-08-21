import { useSelector } from "react-redux";
import { useMovies } from "../hooks/useMovies";
import HeroBanner from "./HeroBanner";
import MoviesList from "./MoviesList";
import { useEffect, useState } from "react";

const Browse = () => {
  useMovies();
  const { nowPlaying, popular, topRated, upcoming } = useSelector(
    (store) => store.movies
  );

  const [randomIndex, setRandomIndex] = useState(null);

  useEffect(() => {
    if (nowPlaying?.results?.length) {
      setRandomIndex(Math.floor(Math.random() * nowPlaying.results.length));
    }
  }, [nowPlaying]);

  if (!nowPlaying || !nowPlaying.results || randomIndex === null) return null;

  const selectedMovie = nowPlaying.results[randomIndex];
  const trailerId = selectedMovie.id;
  const title = selectedMovie.original_title;
  const description = selectedMovie.overview;
  const votes = selectedMovie.vote_average;
  const releaseDate = selectedMovie.release_date;

  return (
    <div className="bg-black">
      <HeroBanner
        trailerId={trailerId}
        title={title}
        description={description}
        votes={votes}
        releaseDate={releaseDate}
      />
      <div className="-mt-10 relative mb-5">
        <MoviesList name="Now Playing" list={nowPlaying?.results} />
      </div>

      <div className="mb-5">
        <MoviesList name="Popular" list={popular?.results} />
      </div>
      <div className="mb-5">
        <MoviesList name="Top Rated" list={topRated?.results} />
      </div>

      <MoviesList name="Upcoming" list={upcoming?.results} />
    </div>
  );
};

export default Browse;
