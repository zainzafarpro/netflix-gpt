import { useEffect } from "react";
import { MOVIE_API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlaying } from "../utils/moviesSlice";

export const useMovies = () => {
  const dispatch = useDispatch();
  const fetchData = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      MOVIE_API_OPTIONS
    );
    const json = await data.json();
    dispatch(addNowPlaying(json));
  };
  useEffect(() => {
    fetchData();
  }, []);
};
