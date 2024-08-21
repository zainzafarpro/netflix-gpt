import { useEffect } from "react";
import { MOVIE_API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailers } from "../utils/moviesSlice";

export const useTrailers = (id) => {
  const dispatch = useDispatch();
  const trailer = useSelector((store) => store.movies?.trailers?.[id]);

  const fetchTrailers = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        MOVIE_API_OPTIONS
      );
      const response = await data.json();
      dispatch(addTrailers({ id, trailers: response }));
    } catch (error) {
      console.error("Error fetching trailers:", error);
    }
  };

  useEffect(() => {
    if (id && !trailer) {
      fetchTrailers();
    }
  }, [id, trailer, dispatch]);
};
