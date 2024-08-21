export const MOVIE_API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.REACT_APP_TMDB_AUTH_KEY,
  },
};

export const MOVIES_NOWPLAYING =
  "https://api.themoviedb.org/3/movie/now_playing";

export const MOVIES_POPULAR = "https://api.themoviedb.org/3/movie/popular";

export const MOVIES_TOPRATED = "https://api.themoviedb.org/3/movie/top_rated";

export const MOVIES_UPCOMING = "https://api.themoviedb.org/3/movie/upcoming";

export const MOVIE_POSTER_CDN = "https://image.tmdb.org/t/p/w300/";

export const YOUTUBE_CLIP_CDN = "https://www.youtube.com/embed/";
