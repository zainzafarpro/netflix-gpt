import { useEffect } from "react";
import {
  MOVIES_NOWPLAYING,
  MOVIES_POPULAR,
  MOVIES_TOPRATED,
  MOVIES_UPCOMING,
  MOVIE_API_OPTIONS,
} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addNowPlaying,
  addPopular,
  addTopRated,
  addUpcoming,
} from "../utils/moviesSlice";

export const useMovies = () => {
  const { nowPlaying, popular, topRated, upcoming } = useSelector(
    (store) => store.movies
  );
  const dispatch = useDispatch();
  const fetchNowplaying = async () => {
    try {
      const [nowPlaying, popular, topRated, upcoming] = await Promise.all([
        fetch(MOVIES_NOWPLAYING, MOVIE_API_OPTIONS).then((res) => res.json()),
        fetch(MOVIES_POPULAR, MOVIE_API_OPTIONS).then((res) => res.json()),
        fetch(MOVIES_TOPRATED, MOVIE_API_OPTIONS).then((res) => res.json()),
        fetch(MOVIES_UPCOMING, MOVIE_API_OPTIONS).then((res) => res.json()),
      ]);

      dispatch(addNowPlaying(nowPlaying));
      dispatch(addPopular(popular));
      dispatch(addTopRated(topRated));
      dispatch(addUpcoming(upcoming));
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    if (!nowPlaying && !popular && !topRated && !upcoming) {
      fetchNowplaying();
    }
  }, []);
};
