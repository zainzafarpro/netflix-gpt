import { useSelector } from "react-redux";
import { useMovies } from "../hooks/useMovies";
import HeroBanner from "./HeroBanner";
import MoviesList from "./MoviesList";
import { useEffect, useState } from "react";

const Browse = () => {
  useMovies();
  const { nowPlaying, popular, topRated, upcoming, heroIndex } = useSelector(
    (store) => store.movies
  );

  if (!nowPlaying || !nowPlaying.results || heroIndex === null) return null;

  const selectedMovie = nowPlaying.results[heroIndex];
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
      <div className="mt-10 md:-mt-10 relative mb-5">
        <MoviesList
          id="now_playing"
          name="Now Playing"
          list={nowPlaying?.results}
        />
      </div>

      <div className="mb-5">
        <MoviesList name="Popular" id="popular" list={popular?.results} />
      </div>
      <div className="mb-5">
        <MoviesList name="Top Rated" id="top_rated" list={topRated?.results} />
      </div>

      <MoviesList name="Upcoming" id="upcoming" list={upcoming?.results} />
    </div>
  );
};

export default Browse;
