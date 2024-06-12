import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlaying: {},
  },
  reducers: {
    addNowPlaying: (state, action) => {
      state.nowPlaying = action.payload;
    },
  },
});

export const { addNowPlaying } = moviesSlice.actions;
export default moviesSlice.reducer;
