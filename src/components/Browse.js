import React from "react";
import { useMovies } from "../hooks/useMovies";

const Browse = () => {
  useMovies();

  return <div>Browse</div>;
};

export default Browse;
