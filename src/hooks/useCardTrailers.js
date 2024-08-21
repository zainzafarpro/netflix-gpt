import { MOVIE_API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addCardTrailers } from "../utils/moviesSlice";

export const useCardTrailers = (id) => {
  const dispatch = useDispatch();
  const trailer = useSelector((store) => store.movies?.cardTrailers?.[id]);

  const fetchTrailers = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        MOVIE_API_OPTIONS
      );
      const response = await data.json();
      dispatch(addCardTrailers({ id, cardTrailers: response }));
    } catch (error) {
      console.error("Error fetching trailers:", error);
    }
  };

  if (id && !trailer) {
    fetchTrailers();
  }
};
