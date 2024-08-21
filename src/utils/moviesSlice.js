import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlaying: null,
    popular: null,
    topRated: null,
    upcoming: null,
    trailers: {},
    cardTrailers: {},
  },
  reducers: {
    addNowPlaying: (state, action) => {
      state.nowPlaying = action.payload;
    },
    addPopular: (state, action) => {
      state.popular = action.payload;
    },
    addTopRated: (state, action) => {
      state.topRated = action.payload;
    },
    addUpcoming: (state, action) => {
      state.upcoming = action.payload;
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
      state.nowPlaying = null;
      state.popular = null;
      state.topRated = null;
      state.upcoming = null;
      state.trailers = {};
      state.cardTrailers = {};
    },
  },
});

export const {
  addNowPlaying,
  addPopular,
  addTopRated,
  addUpcoming,
  addTrailers,
  addCardTrailers,
  clearMovies,
} = moviesSlice.actions;
export default moviesSlice.reducer;
