import { useEffect, useState } from "react";
import { MOVIE_API, MOVIE_API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addNowPlaying,
  addPopular,
  addTopRated,
  addUpcoming,
} from "../utils/moviesSlice";

const usePaginatedMovies = (id, inView) => {
  const store = useSelector((store) => store.movies);
  const dispatch = useDispatch();
  const [count, setCount] = useState(2);
  const [shouldFetch, setShouldFetch] = useState(false);

  useEffect(() => {
    if (inView && !shouldFetch) {
      setShouldFetch(true);
    }
  }, [inView]);

  useEffect(() => {
    if (shouldFetch) {
      const reFetch = async () => {
        const data = await fetch(
          MOVIE_API + id + `?page=${count}`,
          MOVIE_API_OPTIONS
        );
        const result = await data.json();

        if (id === "now_playing") {
          dispatch(addNowPlaying(result));
        } else if (id === "popular") {
          dispatch(addPopular(result));
        } else if (id === "top_rated") {
          dispatch(addTopRated(result));
        } else if (id === "upcoming") {
          dispatch(addUpcoming(result));
        }

        setCount(count + 1);
        setShouldFetch(false);
      };

      reFetch();
    }
  }, [shouldFetch, count, dispatch, id]);
};

export default usePaginatedMovies;
