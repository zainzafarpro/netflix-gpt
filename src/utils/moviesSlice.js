import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    heroIndex: null,
    nowPlaying: {
      total_pages: null,
      page: null,
      results: [],
    },
    popular: {
      total_pages: null,
      page: null,
      results: [],
    },
    topRated: {
      total_pages: null,
      page: null,
      results: [],
    },
    upcoming: {
      total_pages: null,
      page: null,
      results: [],
    },
    trailers: {},
    cardTrailers: {},
  },
  reducers: {
    updateHeroIndex: (state, action) => {
      state.heroIndex = action.payload;
    },
    addNowPlaying: (state, action) => {
      let { page, results, total_pages } = action.payload;
      state.nowPlaying.page = page;
      state.nowPlaying.total_pages = total_pages;
      state.nowPlaying.results = [
        ...state.nowPlaying.results.filter(
          (movie) => !results.some((newMovie) => newMovie.id === movie.id)
        ),
        ...results,
      ];
    },
    addPopular: (state, action) => {
      let { page, results, total_pages } = action.payload;
      state.popular.page = page;
      state.popular.total_pages = total_pages;
      state.popular.results = [
        ...state.popular.results.filter(
          (movie) => !results.some((newMovie) => newMovie.id === movie.id)
        ),
        ...results,
      ];
    },
    addTopRated: (state, action) => {
      let { page, results, total_pages } = action.payload;
      state.topRated.page = page;
      state.topRated.total_pages = total_pages;
      state.topRated.results = [
        ...state.topRated.results.filter(
          (movie) => !results.some((newMovie) => newMovie.id === movie.id)
        ),
        ...results,
      ];
    },
    addUpcoming: (state, action) => {
      let { page, results, total_pages } = action.payload;
      state.upcoming.page = page;
      state.upcoming.total_pages = total_pages;
      state.upcoming.results = [
        ...state.upcoming.results.filter(
          (movie) => !results.some((newMovie) => newMovie.id === movie.id)
        ),
        ...results,
      ];
    },
    addTrailers: (state, action) => {
      const { id, trailers } = action.payload;
      state.trailers[id] = trailers;
    },
    addCardTrailers: (state, action) => {
      const { id, cardTrailers } = action.payload;
      state.cardTrailers[id] = cardTrailers;
    },
    clearMovies: (state) => {
      state.heroIndex = null;
      state.nowPlaying = {
        page: null,
        total_pages: null,
        results: [],
      };
      state.popular = {
        page: null,
        total_pages: null,
        results: [],
      };
      state.topRated = {
        page: null,
        total_pages: null,
        results: [],
      };
      state.upcoming = {
        page: null,
        total_pages: null,
        results: [],
      };
      state.trailers = {};
      state.cardTrailers = {};
    },
  },
});

export const {
  updateHeroIndex,
  addNowPlaying,
  addPopular,
  addTopRated,
  addUpcoming,
  addTrailers,
  addCardTrailers,
  clearMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;
